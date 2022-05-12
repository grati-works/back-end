import { ListUsersUseCase } from '@modules/organizations/useCases/listUsers/ListUsersUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';

let listUsersUseCase: ListUsersUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('List organization users', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    listUsersUseCase = new ListUsersUseCase(organizationsRepository);
  });

  it('should be able to list organization users', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const users = await listUsersUseCase.execute(organization.id.toString());

    expect(users).toHaveLength(1);
    expect(users.find(user => user.id === createdUser.id)).toBeDefined();
  });
});
