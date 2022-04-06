import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Organization } from '@prisma/client';

@injectable()
class ListOrganizationsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<Organization[]> {
    const organizations = await this.usersRepository.listOrganizations(
      Number(id),
    );

    return organizations;
  }
}

export { ListOrganizationsUseCase };
