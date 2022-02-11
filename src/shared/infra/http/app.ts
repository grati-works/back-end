import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import upload from '@config/upload';

import '@shared/container';

import { router } from './routes';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }
  
      return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
      });
    }
  );

export { app };