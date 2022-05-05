import { EditOrganizationUseCase } from '@modules/organizations/useCases/editOrganization/EditOrganizationUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';

let editOrganizationUseCase: EditOrganizationUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;

describe('Edit organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();

    editOrganizationUseCase = new EditOrganizationUseCase(
      organizationsRepository,
      usersRepository,
    );
  });

  test.todo('should be able to edit organization');
});
