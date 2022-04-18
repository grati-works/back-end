import { inject, injectable } from 'tsyringe';
import { hash, compare } from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class EditUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    id: string,
    { name, username, password, new_password, profile_picture },
  ): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(Number(id));

    if (!userAlreadyExists) {
      throw new AppError('User not exists', 400, 'user.not_exists');
    }

    if (password) {
      const passwordMatch = await compare(password, userAlreadyExists.password);

      if (!passwordMatch) {
        throw new AppError(
          'The password is incorrect',
          401,
          'user.password.incorrect',
        );
      }

      password = await hash(new_password, 8);
    }

    await this.usersRepository.update(Number(id), {
      name,
      username,
      password,
      profile_picture,
    });
  }
}

export { EditUserUseCase };
