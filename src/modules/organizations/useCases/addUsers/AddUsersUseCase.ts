import { inject, injectable, container } from 'tsyringe';
import { Organization } from '@prisma/client';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import fs from 'fs';
import { parse } from 'csv-parse';

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
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  loadUsers(file: Express.Multer.File): Promise<IAddUserDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const users: IAddUserDTO[] = [];

      const parseFile = parse({
        delimiter: ';',
      });

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, username, email] = line;
          users.push({
            name,
            username,
            email,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(users);
        })
        .on('error', error => {
          reject(error);
        });
    });
  }

  async execute({ organizationId, authorId, users }: IAddUsers): Promise<void> {
    let parsedUsers = users;

    if ((parsedUsers as unknown as Express.Multer.File).fieldname !== null) {
      parsedUsers = await this.loadUsers(users as Express.Multer.File);
    }

    const user = await this.usersRepository.findById(Number(authorId));
    const userIsOwner = await this.organizationsRepository.checkIfUserIsOwner(
      Number(user.id),
      Number(organizationId),
    );

    if (!userIsOwner) {
      throw new AppError('This user is not the owner of this organization');
    }

    const organization = await this.organizationsRepository.findById(
      Number(organizationId),
    );

    if (!organization) {
      throw new AppError('Organization not found');
    }

    (parsedUsers as IAddUserDTO[]).map(async user => {
      const userAlreadyHaveAccount = await this.usersRepository.findByEmail(
        user.email,
      );

      if (!userAlreadyHaveAccount) {
        const temporaryPassword = `${uuidV4().substring(0, 5)}-${
          user.username
        }!`;
        console.log(temporaryPassword);
        const hashedPassword = await hash(temporaryPassword, 8);

        this.usersRepository
          .create({
            name: user.name,
            username: user.username,
            email: user.email,
            password: hashedPassword,
          })
          .then(async () => {
            const sendCreateAccountMailUseCase = container.resolve(
              SendCreateAccountMailUseCase,
            );
            await sendCreateAccountMailUseCase.execute(
              user.email,
              organization.name,
            );
          });
      } else {
        const sendAddAccountToOrganizationMailUseCase = container.resolve(
          SendAddAccountToOrganizationMailUseCase,
        );
        await sendAddAccountToOrganizationMailUseCase.execute(
          user.email,
          organization.name,
        );
      }

      this.organizationsRepository.addUser(organization.id, user);
    });
  }
}

export { AddUsersUseCase };
