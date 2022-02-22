import { client } from '@shared/infra/prisma';
import {
  CreateOptionalArgs,
  IMessagesRepository,
} from '@modules/messages/repositories/IMessagesRepository';
import { Feedback, Prisma } from '@prisma/client';

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
        sender: {
          connect: {
            id: author_id,
          },
        },
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

  async addReaction(
    author_id: number,
    feedback_id: number,
    emoji: string,
  ): Promise<void> {
    await client.feedback.update({
      where: { id: feedback_id },
      data: {
        Reaction: {
          create: {
            emoji,
            user: {
              connect: {
                id: author_id,
              },
            },
          },
        },
      },
    });
  }

  async removeReaction(
    author_id: number,
    feedback_id: number,
    emoji: string,
  ): Promise<void> {
    const reaction = await client.reaction.findFirst({
      where: {
        user: {
          id: author_id,
        },
        feedback_id,
        emoji,
      },
    });

    await client.feedback.update({
      where: { id: feedback_id },
      data: {
        Reaction: {
          delete: {
            id: reaction.id,
          },
        },
      },
    });
  }

  async delete(author_id: number, feedback_id: number): Promise<void> {
    await client.feedback.update({
      where: {
        id: feedback_id,
      },
      data: {
        deleted: {
          connect: {
            id: author_id,
          },
        },
      },
    });
  }

  async list(filter: Prisma.FeedbackWhereInput = null): Promise<Feedback[]> {
    const feedbackList = await client.feedback.findMany({
      where: {
        deleted: null,
        ...filter,
      },
      include: {
        sender: true,
        receivers: true,
        tags: true,
        Reaction: true,
      },
    });

    return feedbackList;
  }
}

export { MessagesRepository };
