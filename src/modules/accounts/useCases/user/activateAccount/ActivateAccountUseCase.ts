import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ActivateAccountUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(token: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    if (
      this.dateProvider.compareIfExpired(
        userToken.expires_at,
        this.dateProvider.dateNow(),
      )
    ) {
      this.usersTokensRepository.deleteById(userToken.id);
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    this.usersRepository.activate(userToken.user_id);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ActivateAccountUseCase };
