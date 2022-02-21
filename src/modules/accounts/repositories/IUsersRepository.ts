import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Prisma, Profile } from '@prisma/client';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Profile>;
  update(
    id: number,
    { name, username, password }: Prisma.ProfileUpdateInput,
  ): Promise<Profile>;
  findByEmail(
    email: string,
    select?: Prisma.ProfileSelect,
  ): Promise<IFindUserDTO>;
  findById(id: number, select?: Prisma.ProfileSelect): Promise<IFindUserDTO>;
  activate(id: number): Promise<void>;
}

export { IUsersRepository };
