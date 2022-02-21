import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

import { Prisma } from '@prisma/client';

@injectable()
class EditOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    author_id: string,
    organization_id: string,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<void> {
    if (!organization_id) {
      throw new AppError('Organization id is required');
    }

    const user = await this.usersRepository.findById(Number(author_id));
    const userIsOwner = await this.organizationsRepository.checkIfUserIsOwner(
      Number(user.id),
      Number(organization_id),
    );

    if (!userIsOwner) {
      throw new AppError('This user is not the owner of this organization');
    }

    if (data.color_mode) {
      data = {
        ...data,
        color_mode: {
          connect: {
            id: Number(data.color_mode),
          },
        },
      };
    }

    await this.organizationsRepository.update(Number(organization_id), data);
  }
}

export { EditOrganizationUseCase };
