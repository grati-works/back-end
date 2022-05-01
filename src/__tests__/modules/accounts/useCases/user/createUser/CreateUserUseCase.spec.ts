import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { createFakeUser } from '@utils/testUtils';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: EtherealMailProvider;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new EtherealMailProvider();

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      sendActivateAccountMailUseCase,
    );
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to create user with existent mail', async () => {
    const user = await createFakeUser();

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('Email already in use', 409, 'user.email.in_use'),
    );
  });

  it('should not be able to create user with existent username', async () => {
    const user1 = await createFakeUser();

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
