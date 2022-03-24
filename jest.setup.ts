import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container';

import checkColorModes from '@utils/functions/checkColorModes';
import checkPermissions from '@utils/functions/checkPermissions';

beforeAll(() => {
  checkColorModes();
  checkPermissions();
});

beforeEach(() => {
  container.clearInstances();
});
