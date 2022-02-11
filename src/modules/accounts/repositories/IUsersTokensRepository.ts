import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '@prisma/client';

interface IUsersTokensRepository {
  create({ expires_at, token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserId(user_id: number): Promise<UserTokens[]>;
  findByUserIdAndRefreshToken(user_id: number, token: string): Promise<UserTokens>;
  deleteById(id: number): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };