import { logger } from '@utils/logger';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

class SMTPMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    this.client = transporter;
  }

  async sendMail(
    to: string,
    subject: string,
    variables: object,
    template: (_: unknown) => string,
  ): Promise<void> {
    if (!process.env.DATABASE_URL.includes('grati_test')) {
      const parsedTemplate = template(variables);

      try {
        const message = await this.client.sendMail({
          to,
          from: 'Grati Works <noreply@grati.works>',
          subject,
          html: parsedTemplate,
        });

        logger.info('Message sent: %s', message.messageId);
      } catch (err) {
        logger.error(err);
      }
    }
  }
}

export { SMTPMailProvider };
