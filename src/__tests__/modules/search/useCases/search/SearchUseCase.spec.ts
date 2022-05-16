import { SearchUseCase } from '@modules/search/useCases/search/SearchUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import axios from 'axios';

jest.mock('axios');

let searchUseCase: SearchUseCase;
let profilesRepository: IProfilesRepository;

describe('Search user in database', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository();

    searchUseCase = new SearchUseCase(profilesRepository);
  });

  it('should be able to search user in database', async () => {
    const {
      createdUser: user1,
      organization: { id: organization_id },
    } = await createFakeProfile();
    const { createdUser: user2 } = await createFakeProfile(organization_id);
    const { createdUser: user3 } = await createFakeProfile(organization_id);

    const results = {
      data: [`user:${user1.id}`, `user:${user2.id}`, `user:${user3.id}`],
    };

    // @ts-ignore
    axios.get.mockResolvedValueOnce(results);

    const spyProfilesRepository = jest.spyOn(
      profilesRepository,
      'findManyByUserAndOrganizationId',
    );

    await searchUseCase.execute({
      organization_id,
      query: 'user',
    });

    expect(spyProfilesRepository).toHaveBeenCalled();
  });
});
