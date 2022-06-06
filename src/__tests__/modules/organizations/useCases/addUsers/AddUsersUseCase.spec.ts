import { AddUsersUseCase } from '@modules/organizations/useCases/addUsers/AddUsersUseCase';
import { createFakeProfile, createFakeUser } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';
import { SendCreateAccountMailUseCase } from '@modules/organizations/useCases/mail/sendCreateAccountMail/SendCreateAccountMailUseCase';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { SendAddAccountToOrganizationMailUseCase } from '@modules/organizations/useCases/mail/sendAddAccountToOrganizationMail/SendAddAccountToOrganizationMail';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';

let addUsersUseCase: AddUsersUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;
let profilesRepository: IProfilesRepository;

let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendCreateAccountMailUseCase: SendCreateAccountMailUseCase;
let sendAddAccountToOrganizationMailUseCase: SendAddAccountToOrganizationMailUseCase;

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let createUserUseCase: CreateUserUseCase;

const spyLoadUsersFunction = jest.fn(
  async (file: Express.Multer.File) => [] as IAddUserDTO[],
);

describe('Add user to organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();
    profilesRepository = new ProfilesRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() };

    sendCreateAccountMailUseCase = new SendCreateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
    sendAddAccountToOrganizationMailUseCase =
      new SendAddAccountToOrganizationMailUseCase(
        usersRepository,
        usersTokensRepository,
        dateProvider,
        mailProvider,
      );
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

    addUsersUseCase = new AddUsersUseCase(
      organizationsRepository,
      usersRepository,
      profilesRepository,
      sendCreateAccountMailUseCase,
      sendAddAccountToOrganizationMailUseCase,
    );
    addUsersUseCase.loadUsers = spyLoadUsersFunction;
  });

  it('should be able to add user to an organization', async () => {
    const { createdUser, organization } = await createFakeProfile();
    const user = await createFakeUser();

    // await addUsersUseCase.execute({
    //   organizationId: organization.id.toString(),
    //   authorId: createdUser.id.toString(),
    //   users: [{ email: user.email, name: user.name, username: user.username }],
    // });

    // expect(spyLoadUsersFunction).toHaveBeenCalled();
  });
});
