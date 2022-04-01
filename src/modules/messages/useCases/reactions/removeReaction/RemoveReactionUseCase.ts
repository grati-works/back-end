import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { AppError } from '@shared/errors/AppError';

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
      throw new AppError('User not found', 404, 'user.not_found');
    }

    const message = await this.messagesRepository.findById(Number(feedback_id));

    if (!message) {
      throw new AppError('Message not found', 404, 'message.not_found');
    }

    await this.messagesRepository.removeReaction(
      Number(user_id),
      Number(feedback_id),
      emoji,
    );
  }
}

export { RemoveReactionUseCase };
