import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Prisma, User } from '@prisma/client';

interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<any>;
  update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
  findByEmail(
    email: string,
    include?: Prisma.UserInclude,
  ): Promise<IFindUserDTO>;
  findByUsername(
    username: string,
    include?: Prisma.UserInclude,
  ): Promise<IFindUserDTO>;
  findById(id: number, include?: Prisma.UserInclude): Promise<IFindUserDTO>;
  activate(id: number): Promise<void>;
}

export { IUsersRepository };
