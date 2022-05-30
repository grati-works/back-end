import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { resolve } from 'path';
import cloudinaryConfig from '@config/cloudinary';

import upload from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

class CloudinaryStorageProvider implements IStorageProvider {
  constructor() {
    cloudinary.config(cloudinaryConfig);
  }

  async save(file: string, folder: string): Promise<UploadApiResponse> {
    const originalName = resolve(upload.tmpFolder, file);

    const result = await cloudinary.uploader.upload(
      originalName,
      {
        public_id: file,
        folder,
        resource_type: 'auto',
        transformation: [
          {
            quality: 'auto',
          },
        ],
      },
      (error, result) => {
        return result;
      },
    );

    await fs.promises.unlink(originalName);

    return result;
  }

  async delete(file: string): Promise<void> {
    await cloudinary.uploader.destroy(file);
  }
}

export { CloudinaryStorageProvider };
