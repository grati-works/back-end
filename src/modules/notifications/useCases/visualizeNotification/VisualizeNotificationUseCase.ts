import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class VisualizeNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(user_id): Promise<void> {
    await this.notificationsRepository.visualize(user_id);
  }
}

export { VisualizeNotificationUseCase };
