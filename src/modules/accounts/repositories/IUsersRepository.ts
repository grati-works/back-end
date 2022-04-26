import { IFindUserDTO } from '@modules/accounts/dtos/IFindUserDTO';
import { Organization, Prisma, User } from '@prisma/client';

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
  findByToken(token: string, token_type: string): Promise<IFindUserDTO>;
  activate(id: number): Promise<void>;
  listOrganizations(id: number): Promise<Organization[]>;
}

export { IUsersRepository };
