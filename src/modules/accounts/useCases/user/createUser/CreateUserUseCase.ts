import { inject, injectable, container } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { User } from '@prisma/client';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    private mailProvider?: SendActivateAccountMailUseCase,
  ) {
    this.mailProvider =
      mailProvider !== null
        ? container.resolve(SendActivateAccountMailUseCase)
        : null;
  }

  async execute({
    name,
    username,
    email,
    password,
    activated = false,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('Email already in use', 400, 'user.email.in_use');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      activated,
    });

    if (this.mailProvider !== null) await this.mailProvider.execute(email);

    return user;
  }
}

export { CreateUserUseCase };
