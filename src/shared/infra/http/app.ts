import 'dotenv/config';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import checkColorModes from '@utils/functions/checkColorModes';

import upload from '@config/upload';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

checkColorModes();

export { app };
