import { inject, injectable } from 'tsyringe';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { AppError } from '@shared/errors/AppError';
import { Feedback, Organization } from '@prisma/client';

@injectable()
class ListMessagesUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute(
    user_id: string,
    organization_id: string,
    page = 0,
  ): Promise<Feedback[]> {
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
