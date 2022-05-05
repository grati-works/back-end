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

  test.todo('should be able to delete message');
});
