import { EditOrganizationUseCase } from '@modules/organizations/useCases/editOrganization/EditOrganizationUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

let editOrganizationUseCase: EditOrganizationUseCase;
let organizationsRepository: IOrganizationsRepository;
let usersRepository: IUsersRepository;

describe('Edit organization', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    usersRepository = new UsersRepository();

    editOrganizationUseCase = new EditOrganizationUseCase(
      organizationsRepository,
      usersRepository,
    );
  });

  it('should be able to edit organization', async () => {
    const { organization, createdUser } = await createFakeProfile();

    const organizationData = {
      name: 'New name',
    };

    const updatedOrganization = await editOrganizationUseCase.execute(
      createdUser.id.toString(),
      organization.id.toString(),
      organizationData,
    );

    expect(updatedOrganization.name).toBe(organizationData.name);
  });

  it('should not be able to edit organization if organization id is null', async () => {
    await expect(
      editOrganizationUseCase.execute(null, null, {}),
    ).rejects.toEqual(
      new AppError(
        'Organization id is required',
        400,
        'organization.id.required',
      ),
    );
  });

  it('should not be able to edit organization if user is not the owner', async () => {
    const { organization } = await createFakeProfile();
    const { createdUser } = await createFakeProfile(organization.id);

    const organizationData = {
      name: 'New name',
    };

    await expect(
      editOrganizationUseCase.execute(
        createdUser.id.toString(),
        organization.id.toString(),
        organizationData,
      ),
    ).rejects.toEqual(
      new AppError(
        'This user is not the owner of this organization',
        403,
        'user.not_owner',
      ),
    );
  });

  it('should be able to edit color mode of organization', async () => {
    const { organization, createdUser } = await createFakeProfile();

    const organizationData = {
      color_mode: 1,
    };

    const updatedOrganization = await editOrganizationUseCase.execute(
      createdUser.id.toString(),
      organization.id.toString(),
      // @ts-ignore
      organizationData,
    );

    expect(updatedOrganization.mode_id).toBe(organizationData.color_mode);
  });
});
