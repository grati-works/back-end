import { CreateOrganizationUseCase } from '@modules/organizations/useCases/createOrganization/CreateOrganizationUseCase';
import {
  createFakeGroup,
  createFakeProfile,
  createFakeUser,
} from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { SendOrganizationCreateMailUseCase } from '@modules/organizations/useCases/mail/sendOrganizationCreateMail/SendOrganizationCreateMailUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let createUserUseCase: CreateUserUseCase;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let sendOrganizationCreateMailUseCase: SendOrganizationCreateMailUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe('Create organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() } as IMailProvider;

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    sendOrganizationCreateMailUseCase = new SendOrganizationCreateMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationsRepository,
      usersRepository,
      sendOrganizationCreateMailUseCase,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      sendActivateAccountMailUseCase,
    );
  });

  it('should be able to create organization', async () => {
    const fakeUser = await createFakeUser();
    const user = await createUserUseCase.execute(fakeUser);

    const organization = await createOrganizationUseCase.execute(
      user.id.toString(),
      'Organization name',
    );

    expect(organization).toHaveProperty('id');
    expect(organization).toHaveProperty('name');
    // @ts-ignore
    expect(organization?.name).toBe('Organization name');
  });

  it('should not be able to create organization if author is null', async () => {
    await expect(
      createOrganizationUseCase.execute(null, 'Organization name'),
    ).rejects.toEqual(
      new AppError('Author id is required', 400, 'author.id.required'),
    );
  });

  it('should not be able to create organization if author is invalid', async () => {
    await expect(
      createOrganizationUseCase.execute('8293', 'Organization name'),
    ).rejects.toEqual(new AppError('Owner not found', 404, 'owner.not_found'));
  });

  it('should catch error if organization already exists', async () => {
    const fakeUser = await createFakeUser();
    const user = await createUserUseCase.execute(fakeUser);

    const organizationsRepositoryCreateFunctionSpy = jest
      .spyOn(organizationsRepository, 'create')
      .mockImplementation(async () => {
        throw new AppError('Organization already exists');
      });

    await expect(
      createOrganizationUseCase.execute(
        user.id.toString(),
        'Organization name',
      ),
    ).rejects.toEqual(new AppError('Organization already exists'));
    expect(organizationsRepositoryCreateFunctionSpy).toHaveBeenCalled();
  });
});
