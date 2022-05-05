import { ListUsersUseCase } from '@modules/organizations/useCases/listUsers/ListUsersUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';

let listUsersUseCase: ListUsersUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('List organization users', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    listUsersUseCase = new ListUsersUseCase(organizationsRepository);
  });

  test.todo('should be able to list organization users');
});
