import { AddUsersUseCase } from '@modules/organizations/useCases/addUsers/AddUsersUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';

let addUsersUseCase: AddUsersUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;
let profilesRepository: IProfilesRepository;

describe('Add user to organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();
    profilesRepository = new ProfilesRepository();

    addUsersUseCase = new AddUsersUseCase(
      organizationsRepository,
      usersRepository,
      profilesRepository,
    );
  });

  test.todo('should be able to add user to an organization');
});
