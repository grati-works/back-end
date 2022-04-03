import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { createFakeUser } from '@utils/testUtils';

let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to create user with existent mail', async () => {
    const user = createFakeUser();

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('Email already in use', 409, 'user.email.in_use'),
    );
  });

  it('should not be able to create user with existent username', async () => {
    const user1 = createFakeUser();

    const user2: ICreateUserDTO = {
      ...user1,
      email: faker.internet.email(user1.name),
    };

    await createUserUseCase.execute(user1);

    await expect(createUserUseCase.execute(user2)).rejects.toEqual(
      new AppError('Username already in use', 409, 'user.username.in_use'),
    );
  });
});
