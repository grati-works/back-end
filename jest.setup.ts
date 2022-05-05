import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container';

import checkColorModes from '@utils/functions/checkColorModes';
import checkPermissions from '@utils/functions/checkPermissions';
import { client } from '@shared/infra/prisma';

beforeAll(async () => {
  await checkColorModes();
  await checkPermissions();
});

beforeEach(() => {
  container.clearInstances();
});

afterAll(async () => {
  await client.userTokens.deleteMany();
  await client.notification.deleteMany();
  await client.feedback.deleteMany();
  await client.profile.deleteMany();
  await client.group.deleteMany();
  await client.organization.deleteMany();
  await client.user.deleteMany();

  await client.$disconnect();
});
