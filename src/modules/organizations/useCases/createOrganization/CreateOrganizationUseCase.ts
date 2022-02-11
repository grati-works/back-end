import { inject, injectable } from 'tsyringe';
import { Profile } from '@prisma/client';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

import { SendOrganizationCreateMailUseCase } from '@modules/organizations/useCases/sendOrganizationCreateMail/SendOrganizationCreateMailUseCase';
import { container } from 'tsyringe';

@injectable()
class CreateOrganizationUseCase {
    constructor(
        @inject("OrganizationsRepository")
        private organizationsRepository: IOrganizationsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute(authorId: string, name: string): Promise<void>  {
        const owner = await this.usersRepository.findById(Number(authorId));

        await this.organizationsRepository.create({
            name,
            owner: {
                connect: {
                    id: owner.id
                }
            }
        }).then(async () => {
            const sendOrganizationCreateMailUseCase = container.resolve(SendOrganizationCreateMailUseCase);
            await sendOrganizationCreateMailUseCase.execute(owner.email, name);
        });
    }
}

export { CreateOrganizationUseCase };