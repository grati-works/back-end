import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { Profile } from '@prisma/client'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';

class UsersRepository implements IUsersRepository {
  async create({ name, username, email, password }: ICreateUserDTO): Promise<Profile> {
    const user = client.profile.create({
        data: {
            name,
            username,
            email,
            password
        }
    });

    return user; 
  }

  async findByEmail(email: string): Promise<Profile> {
    const user = await client.profile.findFirst({ 
        where: { email }
  });
    return user;
  }

  async findById(id: number): Promise<Profile> {
    const user = await client.profile.findFirst({
        where: { id }
    });
    return user;
  }
}

export { UsersRepository };