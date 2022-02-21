import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { GetUserProfileController } from '@modules/accounts/useCases/user/getUserProfile/GetUserProfileController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/user/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '@modules/accounts/useCases/user/createUser/CreateUserController';
import { ActivateAccountController } from '@modules/accounts/useCases/user/activateAccount/ActivateAccountController';
import { EditUserController } from '@modules/accounts/useCases/user/editUser/EditUserController';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const editUserProfileController = new EditUserController();
const getUserProfileController = new GetUserProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();
const createUserController = new CreateUserController();
const activateAccountController = new ActivateAccountController();

userRoutes.get('/:id', getUserProfileController.handle);
userRoutes.post('/', createUserController.handle);
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

userRoutes.post('/edit', ensureAuthenticated, editUserProfileController.handle);

userRoutes.post('/activate', activateAccountController.handle);

export { userRoutes };
