import { ListNotificationUseCase } from '@modules/notifications/useCases/listNotification/ListNotificationUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';

let listNotificationUseCase: ListNotificationUseCase;
let notificationsRepository: INotificationsRepository;
let messagesRepository: IMessagesRepository;

describe('List Notifications', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepository();
    messagesRepository = new MessagesRepository();

    listNotificationUseCase = new ListNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to list notifications', async () => {
    const { createdProfile: senderProfile, organization } =
      await createFakeProfile();
    const { createdUser: receiverUser, createdProfile: receiverProfile } =
      await createFakeProfile(organization.id);
    const group = await createFakeGroup(organization.id);

    const message = await messagesRepository.send({
      author_id: senderProfile.id,
      receivers_usernames: [receiverUser.username],
      groups: [group.id.toString()],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    });

    await notificationsRepository.create(receiverProfile.id, message.id);

    const notifications = await listNotificationUseCase.execute(
      receiverUser.id,
    );

    expect(notifications).toHaveLength(1);
  });
});
