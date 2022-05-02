import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import auth from '@config/auth';

import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    private mailProvider?: SendActivateAccountMailUseCase,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect', 401, 'auth.incorrect');
    }

    if (!user.activated) {
      const vinculedTokens = await this.usersTokensRepository.findByUserId(
        user.id,
      );

      await this.deleteActivateAccountTokens(vinculedTokens);

      await this.mailProvider.execute(email);

      throw new AppError('User not activated', 403, 'auth.not_activated');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401, 'auth.incorrect');
    }

    const token = sign({}, secret_token, {
      subject: `${user.id}`,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: `${user.id}`,
      expiresIn: `${expires_in_refresh_token}d`,
    });

    const expires_at = this.dateProvider.addDays(expires_in_refresh_token);

    await this.usersTokensRepository.create({
      user_id: user.id,
      token: refresh_token,
      expires_at,
      type: 'refresh',
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_picture: user.profile_picture,
      },
      refresh_token,
    };
  }

  async deleteActivateAccountTokens(tokens) {
    tokens
      .filter(token => token.type === 'activate_account')
      .forEach(async vinculedToken => {
        await this.usersTokensRepository.deleteById(vinculedToken.id);
      });
  }
}

export { AuthenticateUserUseCase };
