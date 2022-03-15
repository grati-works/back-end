import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';

@injectable()
class CountNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(user_id: number): Promise<number> {
    const count = await this.notificationsRepository.count(user_id);
    return count;
  }
}

export { CountNotificationUseCase };
