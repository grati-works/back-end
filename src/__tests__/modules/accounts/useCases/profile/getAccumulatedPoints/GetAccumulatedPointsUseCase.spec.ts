import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { GetAccumulatedPointsUseCase } from '@modules/accounts/useCases/profile/getAccumulatedPoints/GetAccumulatedPointsUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { createFakeProfile, createFakeUser } from '@utils/testUtils';

let usersRepository: IUsersRepository;
let profilesRepository: ProfilesRepository;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let getAccumulatedPointsUseCase: GetAccumulatedPointsUseCase;

describe('Get user profile accumulated points', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    profilesRepository = new ProfilesRepository();
    dateProvider = new DayjsDateProvider();

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
    getAccumulatedPointsUseCase = new GetAccumulatedPointsUseCase(
      profilesRepository,
      dateProvider,
    );
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.profile.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to return points if profile does not exist', async () => {
    const user = createFakeUser();
    const createdUser = await createUserUseCase.execute(user);

    const organization_id = '10';

    await expect(
      getAccumulatedPointsUseCase.execute(
        organization_id,
        createdUser.id.toString(),
      ),
    ).rejects.toEqual(
      new AppError('Profile not found', 404, 'profile.not_found'),
    );
  });

  it('should be able to return points', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const points = await getAccumulatedPointsUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
    );

    expect(points).toBeDefined();
    expect(typeof points).toBe('number');
  });
});
