import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateAccountTemplate } from '@modules/organizations/templates/CreateAccountTemplate';

@injectable()
class SendCreateAccountMailUseCase {
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

  async execute(email: string, organization_name: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404, 'user.not_found');
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      token,
      user_id: Number(user.id),
      expires_at: this.dateProvider.addHours(24 * 30), // 30 days
      type: 'organization_create_account',
    });

    const variables = {
      name: user.name,
      organization_name,
      link: `${process.env.CONFIGURE_ACCOUNT_MAIL_URL.replace(
        '$APP_API_PORT',
        process.env.PORT,
      )}${token}`,
    };

    this.mailProvider.sendMail(
      email,
      'Conta grati criada com sucesso! | Grati',
      variables,
      CreateAccountTemplate,
    );
  }
}

export { SendCreateAccountMailUseCase };
