import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/user/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { container } from 'tsyringe';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ name, username, email, password }: ICreateUserDTO): Promise<void>  {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('User already exists');
        }

        const hashedPassword = await hash(password, 8);

        await this.usersRepository.create({
            name,
            username,
            email,
            password: hashedPassword
        }).then(async () => {
            const sendActivateAccountMailUseCase = container.resolve(SendActivateAccountMailUseCase);
            await sendActivateAccountMailUseCase.execute(email);
        });
    }
}

export { CreateUserUseCase };