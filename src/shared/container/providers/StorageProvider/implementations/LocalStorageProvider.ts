import fs from 'fs';
import { resolve } from 'path';
import { get } from 'https';
import upload from '@config/upload';

import { IStorageProvider, UploadResponse } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<UploadResponse> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return {
      url: `https://localhost:${process.env.PORT}/${folder}/${file}`,
      public_id: file,
    };
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }

  async downloadImage(url: string, filename: string): Promise<void> {
    const file = fs.createWriteStream(resolve(upload.tmpFolder, filename));

    const request = get(url, response => {
      response.pipe(file);
    });

    return new Promise((resolve, reject) => {
      request.on('error', () => {
        reject();
      });

      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
  }
}

export { LocalStorageProvider };
