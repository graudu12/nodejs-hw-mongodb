import express from 'express';
import * as fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import swaggerUI from 'swagger-ui-express';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactRoute from './routers/contacts.js';
import authRoute from './routers/auth.js';
import { auth } from './middlewares/auth.js';
const PORT = getEnvVar('PORT', '3000');
const SWAGGER_DOCS = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);
export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCS));
  app.use('/auth', authRoute);
  app.use('/contacts', auth, contactRoute);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
