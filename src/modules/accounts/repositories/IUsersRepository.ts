import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Prisma, Profile, User } from '@prisma/client';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(
    id: number,
    { name, username, password }: Prisma.UserUpdateInput,
  ): Promise<User>;
  findByEmail(email: string, select?: Prisma.UserSelect): Promise<IFindUserDTO>;
  findById(id: number, select?: Prisma.UserSelect): Promise<IFindUserDTO>;
  findProfileById(
    organization_id: number,
    id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Profile>;
  activate(id: number): Promise<void>;
  addPoints(organization_id: number, id: number, points: number): Promise<void>;
  getRanking(organization_id: number, page?: number): Promise<Profile[]>;
}

export { IUsersRepository };
