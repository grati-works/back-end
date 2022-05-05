import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { hash } from 'bcryptjs';
import { Group, Organization, User } from '@prisma/client';

interface FakeUser extends ICreateUserDTO {
  originalPassword: string;
}

export async function createFakeUser(activated = true): Promise<FakeUser> {
  const name = faker.name.findName();
  const password = faker.internet.password();
  const encryptedPassword = await hash(password, 8);

  const user: ICreateUserDTO = {
    name,
    username: faker.internet.userName(),
    email: faker.internet.email(name),
    password: encryptedPassword,
    activated,
  };

  return { ...user, originalPassword: password };
}

export async function createFakeOrganization(
  owner_id: number,
): Promise<Organization> {
  const organization = await client.organization.create({
    data: {
      name: faker.company.companyName(),
      owner_id,
    },
  });

  return organization;
}

export async function createFakeProfile(organization_id = null): Promise<{
  createdUser: User;
  organization?: Organization | null;
}> {
  const user = await createFakeUser();

  delete user.originalPassword;

  const createdUser = await client.user.create({
    data: user,
  });

  let organization: any = {
    id: organization_id,
  };

  if (organization_id === null) {
    organization = await createFakeOrganization(createdUser.id);
  }

  await client.organization.update({
    where: { id: organization.id },
    data: {
      users: {
        create: {
          user_id: createdUser.id,
        },
      },
    },
  });

  return { createdUser, organization };
}

export async function createFakeGroup(organization_id: number): Promise<Group> {
  const group = await client.group.create({
    data: {
      name: faker.lorem.word(),
      organization: {
        connect: {
          id: organization_id,
        },
      },
    },
  });

  return group;
}
