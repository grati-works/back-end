import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CountNotificationController } from '@modules/notifications/useCases/countNotification/CountNotificationController';
import { VisualizeNotificationController } from '@modules/notifications/useCases/visualizeNotification/VisualizeNotificationController';
import { ListNotificationController } from '@modules/notifications/useCases/listNotification/ListNotificationController';

const notificationRoutes = Router();

const countNotificationController = new CountNotificationController();
const visualizeNotificationController = new VisualizeNotificationController();
const listNotificationController = new ListNotificationController();

notificationRoutes.get(
  '/',
  ensureAuthenticated,
  countNotificationController.handle,
);

notificationRoutes.get(
  '/visualize',
  ensureAuthenticated,
  visualizeNotificationController.handle,
);

notificationRoutes.get(
  '/list',
  ensureAuthenticated,
  listNotificationController.handle,
);

export { notificationRoutes };
