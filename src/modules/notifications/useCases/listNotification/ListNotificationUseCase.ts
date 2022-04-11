import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { Notification } from '@prisma/client';

@injectable()
class ListNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(user_id): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.list(user_id);
    return notifications;
  }
}

export { ListNotificationUseCase };
