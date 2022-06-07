import { RemoveUserUseCase } from '@modules/organizations/useCases/removeUser/RemoveUserUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

let removeUserUseCase: RemoveUserUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;

describe('Remove user from organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();

    removeUserUseCase = new RemoveUserUseCase(
      organizationsRepository,
      usersRepository,
    );
  });

  it('should be able to remove user from organization', async () => {
    const { organization, createdUser: organizationAuthor } =
      await createFakeProfile();
    const { createdUser } = await createFakeProfile(organization.id);

    await removeUserUseCase.execute(
      organizationAuthor.id.toString(),
      organization.id.toString(),
      createdUser.id.toString(),
    );

    const organizationUsers = await organizationsRepository.getUsers(
      organization.id,
    );

    expect(organizationUsers).toHaveLength(1);
  });

  it('should not be able to remove user from organization if id is null', async () => {
    await expect(removeUserUseCase.execute('123', null, '321')).rejects.toEqual(
      new AppError(
        'Organization id is required',
        400,
        'organization.id.required',
      ),
    );
  });

  it('should not be able to remove user from organization if user is not owner', async () => {
    const { organization, createdUser: organizationAuthor } =
      await createFakeProfile();
    const { createdUser } = await createFakeProfile(organization.id);

    await expect(
      removeUserUseCase.execute(
        createdUser.id.toString(),
        organization.id.toString(),
        organizationAuthor.id.toString(),
      ),
    ).rejects.toEqual(
      new AppError(
        'This user is not the owner of this organization',
        403,
        'user.not_owner',
      ),
    );
  });
});
