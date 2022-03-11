import { container } from 'tsyringe';

import { IPaymentProvider } from './IPaymentProvider';
import { StripePaymentProvider } from './implementations/StripePaymentProvider';

const paymentProvider = {
  stripe: container.resolve(StripePaymentProvider),
};

container.registerInstance<IPaymentProvider>(
  'PaymentProvider',
  paymentProvider[process.env.PAYMENT_PROVIDER],
);
