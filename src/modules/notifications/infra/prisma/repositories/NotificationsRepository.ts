import { client } from '@shared/infra/prisma';

import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';

class NotificationsRepository implements INotificationsRepository {
  async create(receiver_id: number): Promise<void> {
    await client.notification.create({
      data: {
        user_id: receiver_id,
      },
    });
  }

  async count(receiver_id): Promise<number> {
    const count = await client.notification.count({
      where: {
        user_id: receiver_id,
        visualized: false,
      },
    });
    return count;
  }
}

export { NotificationsRepository };
