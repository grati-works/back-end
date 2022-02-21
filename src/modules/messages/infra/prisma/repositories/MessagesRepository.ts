import { client } from '@shared/infra/prisma';
import {
  CreateOptionalArgs,
  IMessagesRepository,
} from '@modules/messages/repositories/IMessagesRepository';

class MessagesRepository implements IMessagesRepository {
  async send(
    author_id: number,
    receivers_ids: number[],
    tags: string[],
    message: string,
    { attachement, emoji }: CreateOptionalArgs,
  ): Promise<void> {
    await client.feedback.create({
      data: {
        sender_id: author_id,
        receivers: {
          connect: [
            ...receivers_ids.map(receiver_id => ({
              id: receiver_id,
            })),
          ],
        },
        message,
        attachement,
        emoji,
        tags: {
          connect: [
            ...tags.map(tag => ({
              name: tag,
            })),
          ],
        },
      },
    });
  }

  react(author_id: number, feedback_id: number, emoji: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(author_id: number, feedback_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { MessagesRepository };
