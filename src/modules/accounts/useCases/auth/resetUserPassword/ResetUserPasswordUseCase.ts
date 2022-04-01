import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Invalid token', 401, 'token.invalid');
    }

    if (
      this.dateProvider.compareIfExpired(
        userToken.expires_at,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired', 401, 'token.expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    const passwordHash = await hash(password, 8);
    user.password = passwordHash;

    await this.usersRepository.update(user.id, {
      password: passwordHash,
    });

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
