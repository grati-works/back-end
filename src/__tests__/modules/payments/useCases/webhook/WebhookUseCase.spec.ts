import { WebhookUseCase } from '@modules/payments/useCases/webhook/WebhookUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import { StripePaymentProvider } from '@shared/container/providers/PaymentProvider/implementations/StripePaymentProvider';

let webhookUseCase: WebhookUseCase;
let paymentProvider: IPaymentProvider;

describe('Receive events from payment webhook', () => {
  beforeEach(() => {
    paymentProvider = new StripePaymentProvider();

    webhookUseCase = new WebhookUseCase(paymentProvider);
  });

  test.todo('should be able to receive events from payment webhook');
});
