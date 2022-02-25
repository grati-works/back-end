import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import checkColorModes from '@utils/functions/checkColorModes';
import checkPermissions from '@utils/functions/checkPermissions';

import upload from '@config/upload';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

checkColorModes();
checkPermissions();

export { app };
