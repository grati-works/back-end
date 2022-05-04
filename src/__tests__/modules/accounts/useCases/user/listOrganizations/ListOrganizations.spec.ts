import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';
import { ListOrganizationsUseCase } from '@modules/accounts/useCases/user/listOrganizations/ListOrganizationsUseCase';
import { createFakeProfile } from '@utils/testUtils';

let listOrganizationsUseCase: ListOrganizationsUseCase;
let usersRepository: IUsersRepository;

describe('List Organizations', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    listOrganizationsUseCase = new ListOrganizationsUseCase(usersRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.profile.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should be able to get user organizations', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const organizations = await listOrganizationsUseCase.execute(
      createdUser.id.toString(),
    );

    expect(organizations[0].id).toBe(organization.id);
  });
});
