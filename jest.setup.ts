import 'reflect-metadata';
import { container } from 'tsyringe';
import '@shared/container';

beforeEach(() => {
  container.clearInstances();
});
