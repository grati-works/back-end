import { CountNotificationUseCase } from '@modules/notifications/useCases/countNotification/CountNotificationUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';

let countNotificationUseCase: CountNotificationUseCase;
let notificationsRepository: INotificationsRepository;

describe('Count Notifications', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepository();

    countNotificationUseCase = new CountNotificationUseCase(
      notificationsRepository,
    );
  });

  test.todo('should be able to count notifications');
});
