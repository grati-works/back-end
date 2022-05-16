import { SubscribeUseCase } from '@modules/payments/useCases/subscribe/SubscribeUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import { StripePaymentProvider } from '@shared/container/providers/PaymentProvider/implementations/StripePaymentProvider';
import Stripe from 'stripe';

let subscribeUseCase: SubscribeUseCase;
let usersRepository: IUsersRepository;
let paymentProvider: IPaymentProvider;
const spyCreateStripeUserSubscriptionFunction = jest.fn(
  async (email: string, price_id: string) => {
    return {} as Stripe.Checkout.Session;
  },
);

describe('Organization payment and subscription', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    paymentProvider = new StripePaymentProvider();
    paymentProvider = {
      ...paymentProvider,
      createStripeUserSubscription: spyCreateStripeUserSubscriptionFunction,
    };

    subscribeUseCase = new SubscribeUseCase(usersRepository, paymentProvider);
  });

  it('should be able to subscribe to organization', async () => {
    const { createdUser } = await createFakeProfile();

    await subscribeUseCase.execute(createdUser.id.toString(), '123');

    expect(spyCreateStripeUserSubscriptionFunction).toHaveBeenCalled();
  });
});
