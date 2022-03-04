import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Prisma, Profile, User } from '@prisma/client';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { client } from '@shared/infra/prisma';
import { AppError } from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
  async create({
    name,
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = client.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });

    return user;
  }

  async update(
    id: number,
    { name, username, password }: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await client.user.update({
      where: { id },
      data: {
        name,
        username,
        password,
      },
    });

    return user;
  }

  async findByEmail(
    email: string,
    select?: Prisma.UserSelect,
  ): Promise<IFindUserDTO> {
    const user = await client.user.findFirst({
      where: { email },
      select,
    });
    return user as IFindUserDTO;
  }

  async findById(
    id: number,
    select?: Prisma.UserSelect,
  ): Promise<IFindUserDTO> {
    const user = await client.user.findFirst({
      where: { id },
      select,
    });

    return user as IFindUserDTO;
  }

  async findProfileById(
    organization_id: number,
    id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Profile> {
    const profile = await client.profile.findFirst({
      where: {
        organization_id,
        user_id: id,
      },
      select,
    });

    return profile as Profile;
  }

  async activate(id: number): Promise<void> {
    await client.user.update({
      where: { id },
      data: { activated: true },
    });
  }

  async addPoints(
    organization_id: number,
    id: number,
    points: number,
  ): Promise<void> {
    const user = await client.user.findUnique({
      where: { id },
      select: {
        organizations: {
          where: {
            organization_id,
          },
        },
      },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    if (!user.organizations) {
      throw new AppError('User not associated with organization');
    }

    await client.profile.update({
      where: { id: user.organizations[0].id },
      data: {
        points: {
          increment: points,
        },
      },
    });
  }

  async getRanking(organization_id: number, page = 0): Promise<Profile[]> {
    const ranking = await client.profile.findMany({
      where: { organization_id },
      orderBy: { points: 'desc' },
      skip: page * 10,
      take: 10,
    });

    return ranking;
  }
}

export { UsersRepository };
