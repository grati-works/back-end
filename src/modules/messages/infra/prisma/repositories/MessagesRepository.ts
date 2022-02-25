import { client } from '@shared/infra/prisma';
import {
  SendArgs,
  IMessagesRepository,
} from '@modules/messages/repositories/IMessagesRepository';
import { Feedback, Prisma } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

class MessagesRepository implements IMessagesRepository {
  async send({
    author_id,
    organization_id,
    receivers_ids,
    tags,
    message,
    attachments,
  }: SendArgs): Promise<void> {
    await client.feedback.create({
      data: {
        sender: {
          connect: {
            id: author_id,
          },
        },
        Organization: {
          connect: {
            id: organization_id,
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
        attachment: attachments.attachment,
        emoji: attachments.emoji,
        tags: {
          connectOrCreate: [
            ...tags.map(tag => ({
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
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
    const feedback = await client.feedback.findUnique({
      where: {
        id: feedback_id,
      },
      select: {
        deleted_by: true,
      },
    });

    if (feedback.deleted_by !== null) {
      throw new AppError('Message already deleted');
    }

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
