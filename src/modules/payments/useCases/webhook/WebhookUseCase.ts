import { inject, injectable } from 'tsyringe';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import { Request } from 'express';

@injectable()
class WebhookUseCase {
  constructor(
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
  ) {}

  async execute(req: Request): Promise<boolean> {
    const webhookResponse = await this.paymentProvider.webhookSetup(req);
    return webhookResponse;
  }
}

export { WebhookUseCase };
