import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import axios from 'axios';
import { client } from '@shared/infra/prisma';

@injectable()
class SearchUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  async execute({ organization_id, query }): Promise<any> {
    const results = await axios.get(
      `${process.env.SEARCH_SERVICE_URL}/search/${organization_id}?q=${query}`,
    );

    const user_ids = results.data.map(result =>
      Number(result.split('user:')[1]),
    );

    const profiles =
      await this.profilesRepository.findManyByUserAndOrganizationId(
        user_ids,
        Number(organization_id),
        {
          id: true,
          points: true,
          responsibility: true,
          description: true,
          skills: true,
          graduations: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              profile_picture: true,
            },
          },
          vinculed_accounts: true,
        },
      );

    return profiles;
  }
}

export { SearchUseCase };
