import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { MailTrapMailProvider } from '@shared/container/providers/MailProvider/implementations/MailTrapMailProvider';

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: MailTrapMailProvider;

describe('Send activate account mail', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailTrapMailProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      null,
    );

    createUserUseCase = new CreateUserUseCase(usersRepository, null);

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should not send activate an inexistent account', async () => {
    const email = faker.internet.email();

    await expect(sendActivateAccountMailUseCase.execute(email)).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });

  it('should send activate account mail', async () => {
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: true,
    };

    await createUserUseCase.execute(user);

    jest.spyOn(mailProvider, 'sendMail');

    await sendActivateAccountMailUseCase.execute(user.email);

    expect(mailProvider.sendMail).toHaveBeenCalled();
  });
});
