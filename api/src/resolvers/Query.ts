import { excludePrivateFields } from '../utils/user';

const Query = {
  async me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('Authorization required');
    }

    const user = await ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );

    return excludePrivateFields(user);
  }
};

export default Query;
