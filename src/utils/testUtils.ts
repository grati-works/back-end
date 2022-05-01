import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { hash } from 'bcryptjs';

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

export async function createFakeProfile() {
  const user = await createFakeUser();

  delete user.originalPassword;

  const createdUser = await client.user.create({
    data: user,
  });

  const organization = await client.organization.create({
    data: {
      name: faker.company.companyName(),
      owner_id: createdUser.id,
    },
  });

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
