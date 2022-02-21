import { inject, injectable, container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

import { SendOrganizationCreateMailUseCase } from '@modules/organizations/useCases/mail/sendOrganizationCreateMail/SendOrganizationCreateMailUseCase';

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(authorId: string, name: string): Promise<void> {
    if (!authorId) {
      throw new AppError('Author id is required');
    }

    const owner = await this.usersRepository.findById(Number(authorId));

    if (!owner) {
      throw new AppError('Owner not found');
    }

    await this.organizationsRepository
      .create({
        name,
        owner: {
          connect: {
            id: Number(owner.id),
          },
        },
      })
      .then(async () => {
        const userMail = owner.email;
        const sendOrganizationCreateMailUseCase = container.resolve(
          SendOrganizationCreateMailUseCase,
        );
        await sendOrganizationCreateMailUseCase.execute(userMail, name);
      })
      .catch(err => {
        throw new AppError(err.message);
      });
  }
}

export { CreateOrganizationUseCase };