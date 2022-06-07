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

    /* istanbul ignore next */
    if (user.profile_picture && user.profile_picture_public_id)
      await this.storageProvider.delete(
        user.profile_picture_public_id,
        'avatar',
      );

    const file = await this.storageProvider.save(avatar_file, 'avatars');

    const avatar_url = file.url;

    await this.usersRepository.update(user.id, {
      profile_picture: avatar_url,
      profile_picture_public_id: file.public_id,
    });
  }
}

export { UpdateUserAvatarUseCase };
