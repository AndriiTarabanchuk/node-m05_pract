import express from 'express';
import cookieParser from 'cookie-parser';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundAnythingMiddleware } from './middlewares/notFound.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import router from './routers/index.js';

export const startServer = () => {
  const app = express();
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world. You can get list /students or anything else',
    });
  });

  app.use(router);

  app.use(notFoundAnythingMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
