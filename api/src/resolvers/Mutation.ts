import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { excludePrivateFields } from '../utils/user';

const COOKIE_TOKEN_NAME = 'token';
const COOKIE_TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 100; // 100 days cookie
const PASSWORD_MIN_LENGTH = 8;

function setTokenCookie(ctx, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  ctx.response.cookie(COOKIE_TOKEN_NAME, token, {
    httpOnly: true,
    maxAge: COOKIE_TOKEN_MAX_AGE
  });
}

function clearTokenCookie(ctx) {
  ctx.response.clearCookie(COOKIE_TOKEN_NAME);
}

const Mutations = {
  async signup(parent, args, ctx, info) {
    const name = (args.name || '').trim();
    const email = (args.email || '').trim().toLowerCase();

    if (!email || !/[^@]+@[^\.]+\.[^\.]+/.test(email)) {
      throw new Error('Email is required.');
    }

    if ((args.password || '').length < PASSWORD_MIN_LENGTH) {
      throw new Error('The password is not strong enough. Min length is 8 symbols.');
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          name,
          email,
          password,
          journal: {
            create: {
              chapters: []
            }
          }
        }
      },
      info
    );

    setTokenCookie(ctx, user.id);
    return excludePrivateFields(user);
  },
  async login(parent, { email, password }, ctx, info) {
    let user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    const userId = user.id;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    user = await ctx.db.query.user({ where: { id: userId } }, info);

    setTokenCookie(ctx, userId);
    return excludePrivateFields(user);
  },
  logout(parent, args, ctx) {
    clearTokenCookie(ctx);
    return {
      message: 'See you soon!'
    };
  }
};

export default Mutations;
