import { client } from '@shared/infra/prisma';

import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { Notification } from '@prisma/client';

class NotificationsRepository implements INotificationsRepository {
  async create(profile_id: number, feedback_id: number): Promise<void> {
    const profile = await client.profile.findUnique({
      where: { id: profile_id },
      select: { user_id: true },
    });

    await client.notification.create({
      data: {
        user_id: profile.user_id,
        feedback_id,
      },
    });
  }

  async count(user_id: number): Promise<number> {
    const count = await client.notification.count({
      where: {
        user_id,
        visualized: false,
      },
    });
    return count;
  }

  async visualize(user_id: number): Promise<Notification[]> {
    const notifications = await this.list(user_id);

    await client.notification.updateMany({
      where: {
        user_id,
        visualized: false,
      },
      data: {
        visualized: true,
      },
    });

    return notifications;
  }

  async list(user_id: number): Promise<Notification[]> {
    const notifications = await client.notification.findMany({
      where: {
        user_id,
        visualized: false,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
        feedback: {
          select: {
            id: true,
            sender: {
              select: {
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return notifications;
  }
}

export { NotificationsRepository };
