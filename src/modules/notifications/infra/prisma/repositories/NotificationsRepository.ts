import { client } from '@shared/infra/prisma';

import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { Notification } from '@prisma/client';

class NotificationsRepository implements INotificationsRepository {
  async create(user_id: number, feedback_id: number): Promise<void> {
    await client.notification.create({
      data: {
        user_id,
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
    const notifications = await client.notification.findMany({
      where: {
        user_id,
        visualized: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

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
}

export { NotificationsRepository };
