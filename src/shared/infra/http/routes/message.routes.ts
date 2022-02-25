import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ListMessagesController } from '@modules/messages/useCases/listMessages/ListMessagesController';
import { SendMessageController } from '@modules/messages/useCases/sendMessage/SendMessageController';
import { DeleteMessageController } from '@modules/messages/useCases/deleteMessage/DeleteMessageController';

const messageRoutes = Router();

const uploadAttachment = multer(uploadConfig);

const listMessagesController = new ListMessagesController();
const sendMessageController = new SendMessageController();
const deleteMessageController = new DeleteMessageController();

messageRoutes.get(
  '/:organization_id',
  ensureAuthenticated,
  listMessagesController.handle,
);

messageRoutes.post(
  '/:organization_id',
  ensureAuthenticated,
  uploadAttachment.single('attachment'),
  sendMessageController.handle,
);

messageRoutes.delete(
  '/:message_id',
  ensureAuthenticated,
  deleteMessageController.handle,
);

export { messageRoutes };
