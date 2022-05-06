import { inject, injectable, container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import fs from 'fs';
import { parse } from 'csv-parse';

import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

import { v4 as uuidV4 } from 'uuid';
import { SendCreateAccountMailUseCase } from '@modules/organizations/useCases/mail/sendCreateAccountMail/SendCreateAccountMailUseCase';
import { SendAddAccountToOrganizationMailUseCase } from '@modules/organizations/useCases/mail/sendAddAccountToOrganizationMail/SendAddAccountToOrganizationMail';

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
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
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
    const file = users as Express.Multer.File;

    if (file) {
      if (file?.fieldname) {
        parsedUsers = await this.loadUsers(users as Express.Multer.File);

        if (!file?.filename?.endsWith('.csv')) {
          throw new AppError(
            'File must be a CSV file',
            400,
            'file.invalid_extension',
          );
        }
      }
    }

    const user = await this.usersRepository.findById(Number(authorId));
    const userIsOwner = await this.organizationsRepository.checkIfUserIsOwner(
      Number(user.id),
      Number(organizationId),
    );

    if (!userIsOwner) {
      throw new AppError(
        'This user is not the owner of this organization',
        403,
        'user.not_owner',
      );
    }

    const organization = await this.organizationsRepository.findById(
      Number(organizationId),
    );

    if (!organization) {
      throw new AppError(
        'Organization not found',
        404,
        'organization.not_found',
      );
    }

    (parsedUsers as IAddUserDTO[]).map(async user => {
      const userAlreadyHaveAccount = await this.usersRepository.findByEmail(
        user.email,
        {
          organizations: true,
        },
      );

      const userAlreadyInOrganization =
        userAlreadyHaveAccount &&
        userAlreadyHaveAccount.organizations.some(
          organization =>
            organization.organization_id === Number(organizationId),
        );

      let temporaryPassword = null;

      if (!userAlreadyHaveAccount) {
        temporaryPassword = `${uuidV4().substring(0, 5)}-${user.username}!`;

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

            await this.addUserToOrganization(
              user,
              organization,
              temporaryPassword,
            );
          });
      } else if (!userAlreadyInOrganization)
        await this.addUserToOrganization(user, organization, temporaryPassword);
    });
  }

  async addUserToOrganization(user, organization, temporaryPassword) {
    const sendAddAccountToOrganizationMailUseCase = container.resolve(
      SendAddAccountToOrganizationMailUseCase,
    );

    await sendAddAccountToOrganizationMailUseCase.execute(
      user.email,
      organization.name,
      temporaryPassword,
    );

    this.organizationsRepository.addUser(organization.id, user);
  }
}

export { AddUsersUseCase };
