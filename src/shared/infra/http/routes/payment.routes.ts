import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { SubscribeController } from '@modules/payments/useCases/subscribe/SubscribeController';
import { WebhookController } from '@modules/payments/useCases/webhook/WebhookController';

const paymentRoutes = Router();

const subscribeController = new SubscribeController();
const webhookController = new WebhookController();

paymentRoutes.post('/', ensureAuthenticated, subscribeController.handle);
paymentRoutes.post('/webhook', webhookController.handle);

export { paymentRoutes };
