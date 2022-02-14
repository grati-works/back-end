import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { Prisma, Profile } from '@prisma/client'
import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Profile>;
  update(id: number, { name, username, email, password }: ICreateUserDTO): Promise<Profile>;
  findByEmail(email: string, select?: Prisma.ProfileSelect): Promise<IFindUserDTO>
  findById(id: number, select?: Prisma.ProfileSelect): Promise<IFindUserDTO>;
  activate(id: number): Promise<void>;
}

export { IUsersRepository };