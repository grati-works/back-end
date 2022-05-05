import { RemoveUserUseCase } from '@modules/organizations/useCases/removeUser/RemoveUserUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';

let removeUserUseCase: RemoveUserUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;

describe('Remove user from organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();

    removeUserUseCase = new RemoveUserUseCase(
      organizationsRepository,
      usersRepository,
    );
  });

  test.todo('should be able to remove user from organization');
});
