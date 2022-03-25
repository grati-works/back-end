import { inject, injectable } from 'tsyringe';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { Profile } from '@prisma/client';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(organization_id: string): Promise<Profile[]> {
    const users = await this.organizationsRepository.getUsers(
      Number(organization_id),
    );
    return users;
  }
}

export { ListUsersUseCase };
