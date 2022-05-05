import { RemoveReactionUseCase } from '@modules/messages/useCases/reactions/removeReaction/RemoveReactionUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

let removeReactionUseCase: RemoveReactionUseCase;
let usersRepository: IUsersRepository;
let messagesRepository: IMessagesRepository;

describe('Remove Reaction', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    messagesRepository = new MessagesRepository();

    removeReactionUseCase = new RemoveReactionUseCase(
      usersRepository,
      messagesRepository,
    );
  });

  test.todo('should be able to remove reaction to a message');
});
