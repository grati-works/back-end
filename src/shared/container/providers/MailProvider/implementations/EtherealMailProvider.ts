import nodemailer, { Transporter } from 'nodemailer';

import { AppError } from '@shared/errors/AppError';
import { logger } from '@utils/logger';
import { IMailProvider } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const environment = process.env.NODE_ENV;

    try {
      if (environment !== 'test') {
        nodemailer.createTestAccount().then(account => {
          const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
              user: account.user,
              pass: account.pass,
            },
          });

          this.client = transporter;
        });
      }
    } catch (error) {
      throw new AppError(
        'Não foi possível se comunicar com o serviço de email!',
      );
    }
  }

  async sendMail(
    to: string,
    subject: string,
    variables: object,
    template: (_: unknown) => string,
  ): Promise<void> {
    if (!process.env.DATABASE_URL.includes('grati_test')) {
      const parsedTemplate = template(variables);

      const message = await this.client.sendMail({
        to,
        from: 'Grati <noreply@grati.works>',
        subject,
        html: parsedTemplate,
      });

      logger.info('Message sent: %s', message.messageId);
      logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}

export { EtherealMailProvider };
