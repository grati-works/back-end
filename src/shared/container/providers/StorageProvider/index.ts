import { container } from 'tsyringe';

import { IStorageProvider } from './IStorageProvider';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { CloudinaryStorageProvider } from './implementations/CloudinaryProvider';

const diskStorage = {
  local: container.resolve(LocalStorageProvider),
  cloudinary: container.resolve(CloudinaryStorageProvider),
};

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE_PROVIDER],
);
