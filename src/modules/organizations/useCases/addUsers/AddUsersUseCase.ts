import { inject, injectable } from 'tsyringe';
import { Profile, Organization } from '@prisma/client';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import fs from 'fs';
import { parse } from 'csv-parse';

import { container } from 'tsyringe';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

import { v4 as uuidV4 } from 'uuid';
import { SendCreateAccountMailUseCase } from '@modules/organizations/useCases/mail/sendCreateAccountMail/SendOrganizationCreateMailUseCase';
import { SendAddAccountToOrganizationMailUseCase } from '@modules/organizations/useCases/mail/sendAddAccountToOrganizationMail/SendAddAccountToOrganizationMail';

import { Express } from 'express';

interface IAddUsers {
    organizationId: string;
    authorId: string;
    users: IAddUserDTO[] | Express.Multer.File;
}

@injectable()
class AddUsersUseCase {
    constructor(
        @inject("OrganizationsRepository")
        private organizationsRepository: IOrganizationsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    loadUsers(file: Express.Multer.File): Promise<IAddUserDTO[]> {
        return new Promise((resolve, reject) => {
          const stream = fs.createReadStream(file.path);
          const users: IAddUserDTO[] = [];
    
          const parseFile = parse({
            delimiter: ';'
          });
    
          stream.pipe(parseFile);
    
          parseFile.on('data', async line => {
            const [name, username, email] = line;
            users.push({
              name,
              username,
              email
            });
          })
          .on('end', () => {
            fs.promises.unlink(file.path);
            resolve(users);
          })
          .on('error', error => {
            reject(error);
          });
        })
      }

    async execute({ organizationId, authorId, users }: IAddUsers): Promise<void>  {
        var parsedUsers = users;

        if(parsedUsers["fieldname"] !== null) {
            parsedUsers = await this.loadUsers(users as Express.Multer.File);
        }

        const owner = await this.usersRepository.findById(Number(authorId), {
            owned_organizations: true,
            email: true
        });

        if(!owner) {
            throw new AppError('Owner not found');
        }

        if(owner.owned_organizations.length < 1) {
                throw new AppError('Owner not found');
        }

        const ownedOrganizations = owner.owned_organizations as Organization[];
        const organization = ownedOrganizations.find(organization => organization.id == Number(organizationId))

        if(!organization) {
            throw new AppError('Organization not found');
        }

        (parsedUsers as IAddUserDTO[]).map(async (user) => {
            const userAlreadyHaveAccount = await this.usersRepository.findByEmail(user.email);

            if(!userAlreadyHaveAccount) {
                const temporaryPassword = `${uuidV4().substring(0, 5)}-${user.username}!`;
                console.log(temporaryPassword);
                const hashedPassword = await hash(temporaryPassword, 8);

                this.usersRepository.create({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: hashedPassword
                }).then(async () => {
                    const sendCreateAccountMailUseCase = container.resolve(SendCreateAccountMailUseCase);
                    await sendCreateAccountMailUseCase.execute(user.email, organization.name);
                });
            } else {
                const sendAddAccountToOrganizationMailUseCase = container.resolve(SendAddAccountToOrganizationMailUseCase);
                await sendAddAccountToOrganizationMailUseCase.execute(user.email, organization.name);
            }

            this.organizationsRepository.addUser(organization.id, user);
        });
        
    }
}

export { AddUsersUseCase };