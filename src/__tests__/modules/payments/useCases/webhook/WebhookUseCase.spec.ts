import { WebhookUseCase } from '@modules/payments/useCases/webhook/WebhookUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import { StripePaymentProvider } from '@shared/container/providers/PaymentProvider/implementations/StripePaymentProvider';
import { Request } from 'express';

let webhookUseCase: WebhookUseCase;
let paymentProvider: IPaymentProvider;
const spyWebhookSetupFunction = jest.fn(async (request: Request) => true);

describe('Receive events from payment webhook', () => {
  beforeEach(() => {
    paymentProvider = new StripePaymentProvider();
    paymentProvider = {
      ...paymentProvider,
      webhookSetup: spyWebhookSetupFunction,
    };

    webhookUseCase = new WebhookUseCase(paymentProvider);
  });

  it('should be able to receive events from payment webhook', async () => {
    await webhookUseCase.execute({} as Request);
    expect(spyWebhookSetupFunction).toHaveBeenCalled();
  });
});
