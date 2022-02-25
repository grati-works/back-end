import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';

@injectable()
class DeleteMessageUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute(author_id: string, feedback_id: string): Promise<void> {
    await this.messagesRepository.delete(
      Number(author_id),
      Number(feedback_id),
    );
  }
}

export { DeleteMessageUseCase };
