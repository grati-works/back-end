import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailTrapMailProvider } from '@shared/container/providers/MailProvider/implementations/MailTrapMailProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ActivateAccountUseCase } from '@modules/accounts/useCases/user/activateAccount/ActivateAccountUseCase';

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let activateAccountUseCase: ActivateAccountUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: MailTrapMailProvider;

describe('Activate Account', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailTrapMailProvider();

    activateAccountUseCase = new ActivateAccountUseCase(
      usersTokensRepository,
      dateProvider,
      usersRepository,
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

  it('should be able to activate user account', async () => {
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: false,
    };

    const createdUser = await createUserUseCase.execute(user);

    const activateToken = await sendActivateAccountMailUseCase.execute(
      user.email,
    );

    await client.userTokens.deleteMany({
      where: {
        user_id: createdUser.id,
        token: activateToken,
      },
    });

    await client.userTokens.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        token: activateToken,
        created_at: new Date(),
        expires_at: new Date(dateProvider.addHours(3)),
        type: 'activate_account',
      },
    });

    const activateAccount = jest.spyOn(usersRepository, 'activate');

    await activateAccountUseCase.execute(activateToken);

    expect(activateAccount).toHaveBeenCalledWith(createdUser.id);
  });
});