import { SearchUseCase } from '@modules/search/useCases/search/SearchUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';

let searchUseCase: SearchUseCase;
let profilesRepository: IProfilesRepository;

describe('Search user in database', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository();

    searchUseCase = new SearchUseCase(profilesRepository);
  });

  test.todo('should be able to search user in database');
});
