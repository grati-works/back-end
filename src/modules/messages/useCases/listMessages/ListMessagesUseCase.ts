import { inject, injectable } from 'tsyringe';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { Feedback } from '@prisma/client';

@injectable()
class ListMessagesUseCase {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute(
    organization_id: string,
    group_id: number,
    page = 0,
  ): Promise<Feedback[]> {
    const filter: {
      organization_id: number;
      groups?: any;
    } = {
      organization_id: Number(organization_id),
    };

    if (group_id) {
      filter.groups = {
        some: {
          id: group_id,
        },
      };
    }

    const feedbacks = await this.messagesRepository.list({
      filter,
      skip: page * 10,
    });

    return feedbacks;
  }
}

export { ListMessagesUseCase };
