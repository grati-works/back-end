import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateuserDTO';
import { Profile } from '@prisma/client'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Profile>;
  findByEmail(email: string): Promise<Profile>;
  findById(id: number): Promise<Profile>;
}

export { IUsersRepository };