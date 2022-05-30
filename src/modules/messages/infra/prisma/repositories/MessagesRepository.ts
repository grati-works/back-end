import { client } from '@shared/infra/prisma';
import {
  SendArgs,
  IMessagesRepository,
  ListArgs,
  ListResponse,
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
    groups,
    receivers_usernames,
    tags,
    message,
    attachments,
  }: SendArgs): Promise<Feedback> {
    const receivers_profiles = await client.profile.findMany({
      where: {
        organization_id,
        user: {
          username: {
            in: receivers_usernames,
          },
        },
      },
    });

    if (receivers_profiles.length === 0) {
      throw new AppError('Receivers not found', 404, 'receivers.not_found');
    }

    const authorProfile = await client.profile.findFirst({
      where: {
        user: {
          id: author_id,
        },
        organization_id,
      },
    });

    const feedback = await client.feedback.create({
      data: {
        sender: {
          connect: {
            id: authorProfile.id,
          },
        },
        organization: {
          connect: {
            id: organization_id,
          },
        },
        groups: {
          connect: groups.map(group => ({ id: Number(group) })),
        },
        receivers: {
          connect: [
            ...receivers_profiles.map(profile => ({
              id: profile.id,
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

    return feedback;
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
      throw new AppError(
        'Reaction already added',
        400,
        'reaction.already_added',
      );
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
      throw new AppError('Reaction not found', 400, 'reaction.not_found');
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
      throw new AppError(
        'Message already deleted',
        400,
        'message.already_deleted',
      );
    }

    await client.notification.deleteMany({
      where: {
        feedback_id,
      },
    });

    const authorProfile = await client.profile.findFirst({
      where: {
        user: {
          id: author_id,
        },
        sended_feedbacks: {
          some: {
            id: feedback_id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    await client.feedback.update({
      where: {
        id: feedback_id,
      },
      data: {
        deleted: {
          connect: {
            id: authorProfile.id,
          },
        },
      },
    });
  }

  async list({
    filter,
    skip,
    profile_id = null,
  }: ListArgs): Promise<ListResponse | Feedback[]> {
    const feedbackList = (await client.feedback.findMany({
      where: {
        deleted: null,
        ...filter,
      },
      include: {
        sender: userSelect,
        receivers: {
          select: {
            responsibility: true,
            user: userSelect.select.user,
          },
        },
        tags: true,
        reactions: {
          include: {
            user: {
              select: {
                user_id: true,
              },
            },
          },
        },
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

    if (profile_id !== null) {
      const reacted_feedbacks = await client.reaction.findMany({
        where: {
          profile_id,
          feedback_id: {
            in: feedbackList.map(feedback => feedback.id),
          },
        },
      });

      return {
        feedbacks: feedbackList,
        reacted_feedbacks,
      };
    }

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
            user: {
              select: {
                user_id: true,
              },
            },
          },
        },
      },
    });

    return feedback;
  }
}

export { MessagesRepository };
