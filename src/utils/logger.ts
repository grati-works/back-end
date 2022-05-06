import pino from 'pino';

const environment = process.env.NODE_ENV;

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  enabled: environment !== 'test',
});

export { logger };
