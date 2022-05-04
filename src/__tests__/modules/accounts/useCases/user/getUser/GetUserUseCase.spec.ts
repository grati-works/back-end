import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { GetUserUseCase } from '@modules/accounts/useCases/user/getUser/GetUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { createFakeUser } from '@utils/testUtils';

let getUserUseCase: GetUserUseCase;
let usersRepository: IUsersRepository;

describe('Get User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to get inexistent user', async () => {
    await expect(getUserUseCase.execute('123')).rejects.toEqual(
      new AppError('User not found', 404, 'user.not_found'),
    );
  });

  it('should be able to get user', async () => {
    const user = await createFakeUser();
    const createdUser = await usersRepository.create(user);

    const gettedUser = await getUserUseCase.execute(createdUser.id.toString());

    expect(gettedUser.id).toEqual(createdUser.id);
    expect(gettedUser.name).toEqual(createdUser.name);
    expect(gettedUser.username).toEqual(createdUser.username);
    expect(gettedUser.email).toEqual(createdUser.email);
  });
});
