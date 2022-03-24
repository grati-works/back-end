import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { ActivateAccountTemplate } from '@modules/accounts/templates/ActivateAccountTemplate';

@injectable()
class SendActivateAccountMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      token,
      user_id: user.id,
      expires_at: this.dateProvider.addHours(3),
      type: 'activate_account',
    });

    const variables = {
      name: user.name,
      link: `${process.env.ACTIVATE_ACCOUNT_MAIL_URL}${token}`,
    };

    this.mailProvider.sendMail(
      email,
      'Ativação de conta | Grati',
      variables,
      ActivateAccountTemplate,
    );

    return token;
  }
}

export { SendActivateAccountMailUseCase };
