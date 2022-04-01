import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class EditUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, { name, username, password }): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(Number(id));

    if (!userAlreadyExists) {
      throw new AppError('User not exists', 400, 'user.not_exists');
    }

    if (password) {
      password = await hash(password, 8);
    }

    await this.usersRepository.update(Number(id), {
      name,
      username,
      password,
    });
  }
}

export { EditUserUseCase };
