import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';

config({ path: '.env' });

import createServer from './createServer';

const server = createServer();

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }

  next();
});

server.start({
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL
    }},
  s => {
    console.log(`Server is now running on port http://localhost:${s.port}`);
  }
);
