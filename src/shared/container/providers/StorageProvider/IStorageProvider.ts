import { UploadApiResponse } from 'cloudinary';

interface UploadResponse {
  url: string;
  public_id: string;
}

interface IStorageProvider {
  save(
    file: string,
    folder: string,
  ): Promise<UploadResponse | UploadApiResponse>;
  delete(file: string, folder: string): Promise<void>;
  downloadImage?(url: string, filename: string): Promise<void>;
}

export { IStorageProvider, UploadResponse };
