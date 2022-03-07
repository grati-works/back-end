import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';

class UsersRepository implements IUsersRepository {
  async create({
    name,
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await client.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await client.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async findByEmail(
    email: string,
    include?: Prisma.UserInclude,
  ): Promise<IFindUserDTO> {
    const user = await client.user.findUnique({
      where: { email },
      include,
    });

    return user as IFindUserDTO;
  }

  async findByUsername(
    username: string,
    include?: Prisma.UserInclude,
  ): Promise<IFindUserDTO> {
    const user = await client.user.findUnique({
      where: { username },
      include,
    });

    return user as IFindUserDTO;
  }

  async findById(
    id: number,
    include?: Prisma.UserInclude,
  ): Promise<IFindUserDTO> {
    const user = await client.user.findUnique({
      where: { id },
      include,
    });

    return user as IFindUserDTO;
  }

  async activate(id: number): Promise<void> {
    await client.user.update({
      where: { id },
      data: { activated: true },
    });
  }
}

export { UsersRepository };
