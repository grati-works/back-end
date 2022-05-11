import { DeleteMessageUseCase } from '@modules/messages/useCases/deleteMessage/DeleteMessageUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

let deleteMessageUseCase: DeleteMessageUseCase;
let usersRepository: IUsersRepository;
let messagesRepository: IMessagesRepository;

describe('Delete Message', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    messagesRepository = new MessagesRepository();

    deleteMessageUseCase = new DeleteMessageUseCase(
      usersRepository,
      messagesRepository,
    );
  });

  it('should be able to delete message', async () => {
    const deleteMessageUseCaseSpy = jest.spyOn(deleteMessageUseCase, 'execute');

    const { createdUser: senderUser, organization } = await createFakeProfile();
    const { createdUser: receiverUser, createdProfile: receiverProfile } =
      await createFakeProfile(organization.id);
    const group = await createFakeGroup(organization.id);

    const message = await messagesRepository.send({
      author_id: senderUser.id,
      receivers_usernames: [receiverUser.username],
      groups: [group.id.toString()],
      message: 'Nova Mensagem',
      organization_id: organization.id,
      tags: ['Resiliência'],
      attachments: {
        emoji: 'mage',
      },
    });

    await deleteMessageUseCase.execute(
      senderUser.id.toString(),
      message.id.toString(),
    );

    expect(deleteMessageUseCaseSpy).toHaveBeenCalledWith(
      senderUser.id.toString(),
      message.id.toString(),
    );
  });
});
