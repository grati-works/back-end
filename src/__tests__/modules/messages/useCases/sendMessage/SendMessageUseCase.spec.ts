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
import { AppError } from '@shared/errors/AppError';

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

  it('should be able to send message', async () => {
    const sendMessageUseCaseSpy = jest.spyOn(sendMessageUseCase, 'execute');
    const addPointsSpy = jest.spyOn(profilesRepository, 'addPoints');

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
    expect(addPointsSpy).toHaveBeenCalled();
  });

  it('should not be able to send message if author is not found', async () => {
    const { organization } = await createFakeProfile();
    const { createdUser: receiverUser } = await createFakeProfile(
      organization.id,
    );
    const group = await createFakeGroup(organization.id);

    const messageData = {
      author_id: 438,
      receivers_usernames: [receiverUser.username],
      groups: [group.id.toString()],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    };

    await expect(sendMessageUseCase.execute(messageData)).rejects.toEqual(
      new AppError('Author not found', 404, 'author.not_found'),
    );
  });

  it('should be able to download attachment', async () => {
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
        attachment: 'dadsadasdas dasd wd ad sa',
      },
    };

    const saveSpy = jest.spyOn(storageProvider, 'save');
    saveSpy.mockImplementation(async () => {
      return {
        url: `https://localhost`,
        public_id: 'adsadasdasd',
      };
    });

    await sendMessageUseCase.execute(messageData);

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should be able to send message to public group', async () => {
    const sendMessageUseCaseSpy = jest.spyOn(sendMessageUseCase, 'execute');

    const { createdUser: senderUser, organization } = await createFakeProfile();
    const { createdUser: receiverUser } = await createFakeProfile(
      organization.id,
    );

    const messageData = {
      author_id: senderUser.id,
      receivers_usernames: [receiverUser.username],
      groups: ['public'],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    };

    await sendMessageUseCase.execute(messageData);

    expect(sendMessageUseCaseSpy).toHaveBeenCalledWith(messageData);
  });

  it('should be able to send message to private group', async () => {
    const sendMessageUseCaseSpy = jest.spyOn(sendMessageUseCase, 'execute');

    const { createdUser: senderUser, organization } = await createFakeProfile();
    const { createdUser: receiverUser } = await createFakeProfile(
      organization.id,
    );

    const messageData = {
      author_id: senderUser.id,
      receivers_usernames: [receiverUser.username],
      groups: ['private'],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    };

    await sendMessageUseCase.execute(messageData);

    expect(sendMessageUseCaseSpy).toHaveBeenCalledWith(messageData);
  });
});
