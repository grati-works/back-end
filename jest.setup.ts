import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container';

import checkColorModes from '@utils/functions/checkColorModes';
import checkPermissions from '@utils/functions/checkPermissions';
import { client } from '@shared/infra/prisma';
import { logger } from '@utils/logger';

beforeAll(async () => {
  await checkColorModes();
  await checkPermissions();
});

beforeEach(() => {
  container.clearInstances();
  jest.spyOn(logger, 'info').mockImplementation();
  jest.spyOn(logger, 'error').mockImplementation();
});

afterAll(async () => {
  await client.userTokens.deleteMany();
  await client.notification.deleteMany();
  await client.reaction.deleteMany();
  await client.feedback.deleteMany();
  await client.vinculedAccount
    .deleteMany()
    .then(async () => client.profile.deleteMany());
  await client.group.deleteMany();
  await client.organization.deleteMany();
  await client.userTokens.deleteMany();
  await client.user.deleteMany();

  await client.$disconnect();
});
