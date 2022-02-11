import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '@prisma/client';
import { client } from '@shared/infra/prisma';

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_at,
    token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await client.userTokens.create({
        data: {
            expires_at,
            token,
            user_id
        }
    });

    return userToken;
  }

  async findByUserId(user_id: number): Promise<UserTokens[]> {
    const userTokens = await client.userTokens.findMany({
        where: { user_id }
    });
    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id: number, token: string): Promise<UserTokens> {
    const userTokens = await client.userTokens.findFirst({
      where: { user_id, token }
    });
    return userTokens;
  }
  
  async deleteById(id: number): Promise<void> {
    await client.userTokens.delete({
        where: { id }
    });
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    const userToken = await client.userTokens.findFirst({
        where: { token }
    });
    return userToken;
  }
}

export { UsersTokensRepository };