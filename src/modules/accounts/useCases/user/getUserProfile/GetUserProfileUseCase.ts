import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Profile } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<Profile> {
    const user = await this.usersRepository.findById(Number(id));

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export { GetUserProfileUseCase };
