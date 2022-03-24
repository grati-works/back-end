import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateAccountTemplate } from '@modules/organizations/templates/CreateAccountTemplate';

@injectable()
class SendAddAccountToOrganizationMailUseCase {
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
      throw new AppError('User not found', 404);
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      token,
      user_id: Number(user.id),
      expires_at: this.dateProvider.addHours(24 * 30), // 30 days
      type: 'organization_add_user',
    });

    const variables = {
      name: user.name,
      organization_name,
      link: `${process.env.ADDED_TO_ORGANIZATION_MAIL_URL}${token}`,
    };

    this.mailProvider.sendMail(
      email,
      'Você foi adicionado à uma organização! | Grati',
      variables,
      CreateAccountTemplate,
    );
  }
}

export { SendAddAccountToOrganizationMailUseCase };
