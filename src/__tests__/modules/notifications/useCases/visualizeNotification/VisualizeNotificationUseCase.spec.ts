import { VisualizeNotificationUseCase } from '@modules/notifications/useCases/visualizeNotification/VisualizeNotificationUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';

let visualizeNotificationUseCase: VisualizeNotificationUseCase;
let notificationsRepository: INotificationsRepository;

describe('Visualize Notifications', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepository();

    visualizeNotificationUseCase = new VisualizeNotificationUseCase(
      notificationsRepository,
    );
  });

  test.todo('should be able to visualize notifications');
});
