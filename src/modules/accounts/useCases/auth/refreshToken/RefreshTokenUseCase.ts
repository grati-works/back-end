import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    profile_picture: string;
  };
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    let payloadToken;

    try {
      payloadToken = verify(token, auth.secret_refresh_token) as IPayload;
    } catch (err) {
      throw new AppError('Invalid token', 401);
    }

    const { email, sub } = payloadToken;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        Number(user_id),
        token,
      );

    if (!userToken) {
      throw new AppError('Token not found', 401);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_at = this.dateProvider.addDays(auth.expires_in_refresh_token);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: `${auth.expires_in_refresh_token}d`,
    });

    await this.usersTokensRepository.create({
      expires_at,
      token: refresh_token,
      user_id: Number(user_id),
      type: 'refresh_token',
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    const { name, profile_picture } = await this.usersRepository.findByEmail(
      email,
    );

    return {
      token: newToken,
      refresh_token,
      user: {
        id: user_id,
        name,
        email,
        profile_picture,
      },
    };
  }
}

export { RefreshTokenUseCase };
