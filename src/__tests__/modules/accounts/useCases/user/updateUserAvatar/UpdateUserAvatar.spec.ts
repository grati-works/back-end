import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UpdateUserAvatarUseCase } from '@modules/accounts/useCases/user/updateUserAvatar/UpdateUserAvatarUseCase';
import { faker } from '@faker-js/faker';
import { createFakeUser } from '@utils/testUtils';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { v4 as uuidV4 } from 'uuid';

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let usersRepository: IUsersRepository;
let storageProvider: IStorageProvider;

describe('Update User Avatar', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    storageProvider = new LocalStorageProvider();

    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepository,
      storageProvider,
    );
  });

  it('should be able to create user avatar', async () => {
    const user = await createFakeUser();

    const createdUser = await usersRepository.create(user);

    const avatarFile = faker.image.avatar();
    const filename = `${uuidV4()}-avatar.png`;

    jest.setTimeout(5000);
    await storageProvider.downloadImage(avatarFile, filename);

    await updateUserAvatarUseCase.execute({
      user_id: createdUser.id,
      avatar_file: filename,
    });

    const gettedUser = await usersRepository.findById(createdUser.id);

    expect(gettedUser.profile_picture).toEqual(
      `https://localhost:${process.env.PORT}/avatars/${filename}`,
    );

    storageProvider.delete(filename, 'avatars');
  });
});
