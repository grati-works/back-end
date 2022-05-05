import { CreateOrganizationUseCase } from '@modules/organizations/useCases/createOrganization/CreateOrganizationUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';

let createOrganizationUseCase: CreateOrganizationUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;

describe('Create organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationsRepository,
      usersRepository,
    );
  });

  test.todo('should be able to create organization');
});
