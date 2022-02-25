import { inject, injectable } from 'tsyringe';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { Feedback } from '@prisma/client';

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
      organizations: true,
    });

    if (!user) {
      throw new AppError('User not found');
    }

    console.log(user.organizations);

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
