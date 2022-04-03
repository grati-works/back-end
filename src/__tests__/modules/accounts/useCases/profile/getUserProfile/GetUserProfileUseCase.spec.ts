import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { GetUserProfileUseCase } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';

let usersRepository: IUsersRepository;
let profilesRepository: ProfilesRepository;
let createUserUseCase: CreateUserUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get user profile', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    profilesRepository = new ProfilesRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
    getUserProfileUseCase = new GetUserProfileUseCase(profilesRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.profile.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should able to return user profile', async () => {
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: true,
    };

    const createdUser = await createUserUseCase.execute(user);

    const organization = await client.organization.create({
      data: {
        name: faker.company.companyName(),
        owner_id: createdUser.id,
      },
    });

    await client.organization.update({
      where: { id: organization.id },
      data: {
        users: {
          create: {
            user_id: createdUser.id,
          },
        },
      },
    });

    const gettedProfile = await getUserProfileUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
      true,
    );

    expect(gettedProfile).toBeDefined();
    expect(gettedProfile).toHaveProperty('id');
    expect(gettedProfile.user.id).toEqual(createdUser.id);
  });

  it('should not able to return non existent user profile', async () => {
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: true,
    };

    const createdUser = await createUserUseCase.execute(user);

    const organization = await client.organization.create({
      data: {
        name: faker.company.companyName(),
        owner_id: createdUser.id,
      },
    });

    await expect(
      getUserProfileUseCase.execute(organization.id.toString(), '2', true),
    ).rejects.toEqual(
      new AppError('Profile not found', 404, 'profile.not_found'),
    );
  });
});
