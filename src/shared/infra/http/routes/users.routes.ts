import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { GetUserProfileController } from '@modules/accounts/useCases/user/getUserProfile/GetUserProfileController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/user/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '@modules/accounts/useCases/user/createUser/CreateUserController';
import { ActivateAccountController } from '@modules/accounts/useCases/user/activateAccount/ActivateAccountController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const getUserProfileController = new GetUserProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();
const createUserController = new CreateUserController();
const activateAccountController = new ActivateAccountController();

usersRoutes.get('/:id', getUserProfileController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

usersRoutes.post('/activate', activateAccountController.handle);

export { usersRoutes };