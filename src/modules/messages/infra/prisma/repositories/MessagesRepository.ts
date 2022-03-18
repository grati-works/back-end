import { client } from '@shared/infra/prisma';
import {
  SendArgs,
  IMessagesRepository,
  ListArgs,
} from '@modules/messages/repositories/IMessagesRepository';
import { Feedback } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

const userSelect = {
  select: {
    user: {
      select: {
        id: true,
        name: true,
        profile_picture: true,
      },
    },
  },
};
class MessagesRepository implements IMessagesRepository {
  async send({
    author_id,
    organization_id,
    receivers_ids,
    tags,
    message,
    attachments,
  }: SendArgs): Promise<number> {
    const feedback = await client.feedback.create({
      data: {
        sender: {
          connect: {
            id: author_id,
          },
        },
        organization: {
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

    return feedback.id;
  }

  async addReaction(
    author_id: number,
    feedback_id: number,
    emoji: string,
  ): Promise<void> {
    const reactionAlreadyAdded = await client.reaction.findFirst({
      where: {
        emoji,
        feedback_id,
        user: {
          id: author_id,
        },
      },
    });

    if (reactionAlreadyAdded) {
      throw new AppError('Reaction already added');
    }

    await client.feedback.update({
      where: { id: feedback_id },
      data: {
        reactions: {
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
    try {
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
          reactions: {
            delete: {
              id: reaction.id,
            },
          },
        },
      });
    } catch (error) {
      throw new AppError('Reaction not found');
    }
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

  async list({ filter, skip }: ListArgs): Promise<Feedback[]> {
    const feedbackList = (await client.feedback.findMany({
      where: {
        deleted: null,
        ...filter,
      },
      include: {
        sender: userSelect,
        receivers: userSelect,
        tags: true,
        reactions: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      skip,
      take: 10,
    })) as any[];

    feedbackList.forEach((feedback, index) => {
      feedbackList[index].reactions = feedback.reactions.reduce(
        (acc, reaction) => {
          // eslint-disable-next-line no-unused-expressions
          acc[reaction.emoji]
            ? (acc[reaction.emoji] += 1)
            : (acc[reaction.emoji] = 1);

          return acc;
        },
        {},
      );
    });

    return feedbackList;
  }

  async findById(feedback_id: number): Promise<Feedback> {
    const feedback = await client.feedback.findUnique({
      where: {
        id: feedback_id,
      },
      include: {
        sender: userSelect,
        receivers: true,
        tags: true,
        reactions: {
          select: {
            emoji: true,
          },
        },
      },
    });

    return feedback;
  }
}

export { MessagesRepository };
