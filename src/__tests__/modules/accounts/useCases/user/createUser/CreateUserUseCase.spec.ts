import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';

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
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: true,
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('Email already in use', 409, 'user.email.in_use'),
    );
  });

  it('should not be able to create user with existent username', async () => {
    const name = faker.name.findName();
    const user1: ICreateUserDTO = {
      name,
      username: faker.internet.userName(name),
      email: faker.internet.email(),
      password: faker.internet.password(),
      activated: true,
    };

    const user2: ICreateUserDTO = {
      ...user1,
      email: faker.internet.email(name),
    };

    await createUserUseCase.execute(user1);

    await expect(createUserUseCase.execute(user2)).rejects.toEqual(
      new AppError('Username already in use', 409, 'user.username.in_use'),
    );
  });
});
