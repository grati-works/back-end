import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
  });

  it('should not be able to create user with existent mail', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test 4',
      username: 'user_test4',
      email: 'user4@test.com',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('User already exists'),
    );
  });
});
