import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import checkColorModes from '@utils/functions/checkColorModes';
import checkPermissions from '@utils/functions/checkPermissions';

import upload from '@config/upload';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_DOMAIN || process.env.APP_URL,
  }),
);

app.use(
  express.json({
    verify: (req, res, buf) => {
      // @ts-ignore
      req.rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use('/avatars', express.static(`${upload.tmpFolder}/avatars`));
app.use('/attachments', express.static(`${upload.tmpFolder}/attachments`));
app.use('/reports', express.static(`${upload.tmpFolder}/reports`));

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      status: 'error',
      message: err.message,
      code: err.code,
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
