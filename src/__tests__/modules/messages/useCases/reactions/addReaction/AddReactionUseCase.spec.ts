import { AddReactionUseCase } from '@modules/messages/useCases/reactions/addReaction/AddReactionUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { SendMessageUseCase } from '@modules/messages/useCases/sendMessage/SendMessageUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { NotificationsRepository } from '@modules/notifications/infra/prisma/repositories/NotificationsRepository';
import { AppError } from '@shared/errors/AppError';

let addReactionUseCase: AddReactionUseCase;
let usersRepository: IUsersRepository;
let messagesRepository: IMessagesRepository;
let sendMessageUseCase: SendMessageUseCase;
let profilesRepository: IProfilesRepository;
let groupsRepository: IGroupsRepository;
let storageProvider: IStorageProvider;
let notificationsRepository: INotificationsRepository;

describe('Add Reaction', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    messagesRepository = new MessagesRepository();

    addReactionUseCase = new AddReactionUseCase(
      usersRepository,
      messagesRepository,
    );

    profilesRepository = new ProfilesRepository();
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

  it('should be able to add reaction to a message', async () => {
    const sendMessageUseCaseSpy = jest.spyOn(sendMessageUseCase, 'execute');
    const addReactionUseCaseSpy = jest.spyOn(addReactionUseCase, 'execute');

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

    const feedbackId = await sendMessageUseCase.execute(messageData);

    expect(sendMessageUseCaseSpy).toHaveBeenCalledWith(messageData);

    await addReactionUseCase.execute(
      senderUser.id.toString(),
      feedbackId.toString(),
      'thumbsup',
    );

    expect(addReactionUseCaseSpy).toHaveBeenCalledWith(
      senderUser.id.toString(),
      feedbackId.toString(),
      'thumbsup',
    );
  });

  it('should not be able to add reaction to a message if the user is inexistent', async () => {
    await expect(
      addReactionUseCase.execute('9418', '123', 'thumbsup'),
    ).rejects.toEqual(new AppError('User not found', 404, 'user.not_found'));
  });

  it('should not be able to add reaction to a message if the message is inexistent', async () => {
    const { createdUser: senderUser } = await createFakeProfile();

    await expect(
      addReactionUseCase.execute(senderUser.id.toString(), '123', 'thumbsup'),
    ).rejects.toEqual(
      new AppError('Message not found', 404, 'message.not_found'),
    );
  });
});
