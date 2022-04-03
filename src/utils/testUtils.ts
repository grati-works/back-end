import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';

export function createFakeUser(activated = true): ICreateUserDTO {
  const name = faker.name.findName();
  const user: ICreateUserDTO = {
    name,
    username: faker.internet.userName(),
    email: faker.internet.email(name),
    password: faker.internet.password(),
    activated,
  };

  return user;
}

export async function createFakeProfile() {
  const user = createFakeUser();

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