import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class RemoveUserUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    author_id: string,
    organization_id: string,
    user_id: string,
  ): Promise<void> {
    if (!organization_id) {
      throw new AppError(
        'Organization id is required',
        400,
        'organization.id.required',
      );
    }

    const user = await this.usersRepository.findById(Number(author_id));
    const userIsOwner = await this.organizationsRepository.checkIfUserIsOwner(
      Number(user.id),
      Number(organization_id),
    );

    if (!userIsOwner) {
      throw new AppError(
        'This user is not the owner of this organization',
        403,
        'user.not_owner',
      );
    }

    await this.organizationsRepository.removeUser(
      Number(organization_id),
      Number(user_id),
    );
  }
}

export { RemoveUserUseCase };
