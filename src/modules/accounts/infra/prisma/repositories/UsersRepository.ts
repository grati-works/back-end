import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { Prisma, Profile } from '@prisma/client'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';

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

  async update(id: number, { name, username, email, password }: ICreateUserDTO): Promise<Profile> {
    const user = await client.profile.update({
        where: { id },
        data: {
            name,
            username,
            email,
            password
        }
    });
    
    return user;
  }

  async findByEmail(email: string, select?: Prisma.ProfileSelect): Promise<IFindUserDTO> {
    const user = await client.profile.findFirst({ 
        where: { email },
        select
    });
    return user as IFindUserDTO;
  }

  async findById(id: number, select?: Prisma.ProfileSelect): Promise<IFindUserDTO> {
    const user = await client.profile.findFirst({
        where: { id },
        select
    });

    return user as IFindUserDTO;
  }

  async activate(id: number): Promise<void> {
    await client.profile.update({
        where: { id },
        data: { activated: true }
    })
  }
}

export { UsersRepository };