import { logger } from '@utils/logger';

export class AppError {
  public readonly message: string;

  public readonly status: number;

  public readonly code: string;

  constructor(message: string, status = 400, code = undefined, debug = false) {
    this.message = message;
    this.status = status;
    this.code = code;

    if (!process.env.DATABASE_URL.includes('grati_test') && debug)
      logger.error(
        `An error occurred: ${this.message} with status ${this.status} and code ${this.code}`,
      );
  }
}
