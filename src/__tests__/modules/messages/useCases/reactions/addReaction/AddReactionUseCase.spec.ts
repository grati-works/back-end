import { AddReactionUseCase } from '@modules/messages/useCases/reactions/addReaction/AddReactionUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

let addReactionUseCase: AddReactionUseCase;
let usersRepository: IUsersRepository;
let messagesRepository: IMessagesRepository;

describe('Add Reaction', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    messagesRepository = new MessagesRepository();

    addReactionUseCase = new AddReactionUseCase(
      usersRepository,
      messagesRepository,
    );
  });

  test.todo('should be able to add reaction to a message');
});
