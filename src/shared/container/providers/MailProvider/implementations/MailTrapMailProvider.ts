import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

class MailTrapMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
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
    const parsedTemplate = template(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Grati <noreply@grati.works>',
      subject,
      html: parsedTemplate,
    });

    console.log('Message sent: %s', message.messageId);
  }
}

export { MailTrapMailProvider };
