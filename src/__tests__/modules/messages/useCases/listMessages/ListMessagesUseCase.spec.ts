import { ListMessagesUseCase } from '@modules/messages/useCases/listMessages/ListMessagesUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import {
  IMessagesRepository,
  ListResponse,
} from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { SendMessageUseCase } from '@modules/messages/useCases/sendMessage/SendMessageUseCase';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';

let sendMessageUseCase: SendMessageUseCase;
let listMessagesUseCase: ListMessagesUseCase;
let messagesRepository: IMessagesRepository;
let profilesRepository: IProfilesRepository;
let groupsRepository: IGroupsRepository;
let storageProvider: IStorageProvider;
let notificationsRepository: INotificationsRepository;

describe('List Messages', () => {
  beforeEach(() => {
    messagesRepository = new MessagesRepository();
    profilesRepository = new ProfilesRepository();

    listMessagesUseCase = new ListMessagesUseCase(
      messagesRepository,
      profilesRepository,
    );

    groupsRepository = new GroupsRepository();
    storageProvider = new LocalStorageProvider();
    notificationsRepository = new NotificationsRepository();

    sendMessageUseCase = new SendMessageUseCase(
      profilesRepository,
      messagesRepository,
      groupsRepository,
      storageProvider,
      notificationsRepository,
    );
  });

  it('should be able to list messages', async () => {
    const sendMessageUseCaseSpy = jest.spyOn(sendMessageUseCase, 'execute');

    const { createdUser: senderUser, organization } = await createFakeProfile();
    const { createdUser: receiverUser } = await createFakeProfile(
      organization.id,
    );
    const group = await createFakeGroup(organization.id);

    const messageData = {
      author_id: senderUser.id,
      receivers_usernames: [receiverUser.username],
      groups: [group.id.toString()],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    };

    await sendMessageUseCase.execute(messageData);

    expect(sendMessageUseCaseSpy).toHaveBeenCalledWith(messageData);

    const messages = (await listMessagesUseCase.execute(
      organization.id.toString(),
      group.id,
      0,
      senderUser.id,
    )) as ListResponse;

    expect(messages.feedbacks.length).toBe(1);
  });
});
