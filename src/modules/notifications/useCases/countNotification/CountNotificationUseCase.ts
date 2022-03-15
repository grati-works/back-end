import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CountNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  // user_id: number arg

  async execute(user_id): Promise<number> {
    const count = await this.notificationsRepository.count(user_id);
    return count;
  }
}

export { CountNotificationUseCase };
