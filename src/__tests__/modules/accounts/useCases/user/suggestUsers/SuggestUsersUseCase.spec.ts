import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';
import { SuggestUsersUseCase } from '@modules/accounts/useCases/user/suggestUsers/SuggestUsersUseCase';
import { createFakeProfile } from '@utils/testUtils';

let suggestUsersUseCase: SuggestUsersUseCase;
let usersRepository: IUsersRepository;

describe('Suggest Users', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    suggestUsersUseCase = new SuggestUsersUseCase(usersRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should be able to suggest users', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const users = await suggestUsersUseCase.execute(
      organization.id,
      createdUser.name.slice(2, 5),
    );

    expect(users).toHaveLength(1);
  });
});
