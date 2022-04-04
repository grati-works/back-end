import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { EditUserUseCase } from '@modules/accounts/useCases/user/editUser/EditUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { createFakeUser } from '@utils/testUtils';

let editUserUseCase: EditUserUseCase;
let usersRepository: IUsersRepository;

describe('Edit User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    editUserUseCase = new EditUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to edit inexistent user', async () => {
    await expect(
      editUserUseCase.execute('123', {
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }),
    ).rejects.toEqual(new AppError('User not exists', 400, 'user.not_exists'));
  });

  it('should be able to edit user', async () => {
    const user = createFakeUser();
    const createdUser = await usersRepository.create(user);
    const newUserInfo = {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await editUserUseCase.execute(createdUser.id.toString(), newUserInfo);

    const editedUser = await usersRepository.findById(createdUser.id);

    expect(editedUser.name).toEqual(newUserInfo.name);
    expect(editedUser.username).toEqual(newUserInfo.username);
  });
});