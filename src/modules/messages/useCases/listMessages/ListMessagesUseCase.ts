import { inject, injectable } from 'tsyringe';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { Feedback, Organization } from '@prisma/client';

@injectable()
class ListMessagesUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute(
    user_id: string,
    organization_id: string,
    page = 0,
  ): Promise<Feedback[]> {
    const user = await this.usersRepository.findById(Number(user_id), {
      organizations: {
        select: {
          id: true,
        },
      },
      owned_organizations: {
        select: {
          id: true,
        },
      },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const userOrganizations: Organization[] = [
      ...user.organizations,
      ...user.owned_organizations,
    ];

    if (
      userOrganizations.filter(
        organization => organization.id === Number(organization_id),
      ).length === 0
    ) {
      throw new AppError('User not authorized');
    }

    const feedbacks = await this.messagesRepository.list({
      filter: {
        organization_id: Number(organization_id),
      },
      skip: page * 10,
    });

    return feedbacks;
  }
}

export { ListMessagesUseCase };
