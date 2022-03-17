import { inject, injectable, container } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';

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
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository
      .create({
        name,
        username,
        email,
        password: hashedPassword,
        activated,
      })
      .then(async () => {
        if (this.mailProvider !== null) await this.mailProvider.execute(email);
      });
  }
}

export { CreateUserUseCase };
