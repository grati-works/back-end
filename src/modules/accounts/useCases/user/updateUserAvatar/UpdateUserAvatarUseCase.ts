import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(Number(user_id));

    if (user.profile_picture)
      await this.storageProvider.delete(user.profile_picture, 'avatar');
    await this.storageProvider.save(avatar_file, 'avatars');

    const avatar_url =
      process.env.STORAGE_PROVIDER !== 's3'
        ? `http://localhost:3333/avatars/${avatar_file}`
        : `https://${process.env.AWS_BUCKET_URL}/avatars/${avatar_file}`;

    await this.usersRepository.update(user.id, {
      profile_picture: avatar_url,
    });
  }
}

export { UpdateUserAvatarUseCase };
