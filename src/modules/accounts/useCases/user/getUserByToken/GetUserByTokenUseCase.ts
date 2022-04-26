import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetUserByTokenUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(token: string, type: string): Promise<User> {
    const user = await this.usersRepository.findByToken(token, type);

    if (!user) {
      throw new AppError('User not found', 404, 'user.not_found');
    }

    return user;
  }
}

export { GetUserByTokenUseCase };
