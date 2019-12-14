require('dotenv').config({ path: '.env' });
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const createServer = require('./createServer');

const server = createServer();

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
