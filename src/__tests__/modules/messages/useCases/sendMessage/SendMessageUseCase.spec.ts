import { SendMessageUseCase } from '@modules/messages/useCases/sendMessage/SendMessageUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';

let sendMessageUseCase: SendMessageUseCase;
let profilesRepository: IProfilesRepository;
let messagesRepository: IMessagesRepository;
let groupsRepository: IGroupsRepository;
let storageProvider: IStorageProvider;
let notificationsRepository: INotificationsRepository;

describe('Send Messages', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository();
    messagesRepository = new MessagesRepository();
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

  test.todo('should be able to send message');
});
