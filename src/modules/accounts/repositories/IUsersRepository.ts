import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { Profile } from '@prisma/client'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Profile>;
  update(id: number, { name, username, email, password }: ICreateUserDTO): Promise<Profile>;
  findByEmail(email: string): Promise<Profile>;
  findById(id: number): Promise<Profile>;
  activate(id: number): Promise<void>;
}

export { IUsersRepository };