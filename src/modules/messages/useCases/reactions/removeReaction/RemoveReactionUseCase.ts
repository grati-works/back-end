import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';

@injectable()
class RemoveReactionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute(
    user_id: string,
    feedback_id: string,
    emoji: string,
  ): Promise<void> {
    const user = await this.usersRepository.findById(Number(user_id));

    if (!user) {
      throw new Error('User not found');
    }

    const message = await this.messagesRepository.findById(Number(feedback_id));

    if (!message) {
      throw new Error('Message not found');
    }

    await this.messagesRepository.removeReaction(
      Number(user_id),
      Number(feedback_id),
      emoji,
    );
  }
}

export { RemoveReactionUseCase };
