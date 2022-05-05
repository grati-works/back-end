import { ListMessagesUseCase } from '@modules/messages/useCases/listMessages/ListMessagesUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IMessagesRepository } from '@modules/messages/repositories/IMessagesRepository';
import { MessagesRepository } from '@modules/messages/infra/prisma/repositories/MessagesRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';

let listMessagesUseCase: ListMessagesUseCase;
let messagesRepository: IMessagesRepository;
let profilesRepository: IProfilesRepository;

describe('List Messages', () => {
  beforeEach(() => {
    messagesRepository = new MessagesRepository();
    profilesRepository = new ProfilesRepository();

    listMessagesUseCase = new ListMessagesUseCase(
      messagesRepository,
      profilesRepository,
    );
  });

  test.todo('should be able to list messages');
});
