import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(organization_id: string, id: string): Promise<User> {
    const user = await this.usersRepository.findById(Number(id));

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export { GetUserUseCase };
