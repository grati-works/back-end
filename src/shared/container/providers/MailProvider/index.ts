import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SMTPMailProvider } from './implementations/SMTPMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  smtp: container.resolve(SMTPMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
