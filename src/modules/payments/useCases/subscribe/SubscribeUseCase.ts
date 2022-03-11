import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import Stripe from 'stripe';

@injectable()
class SubscribeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PaymentProvider')
    private paymentProvider: IPaymentProvider,
  ) {}

  async execute(
    user_id: string,
    plan_duration: 'monthly' | 'trimester' | 'yearly',
    plan_size: 'small' | 'medium' | 'large',
  ): Promise<Stripe.Checkout.Session> {
    const plans = {
      monthly: {
        small: 'price_1Kc83cEbfCRAyYuxaYMOmuBs',
        medium: 'price_1Kc84eEbfCRAyYuxddNoFjPp',
        large: 'price_1Kc85IEbfCRAyYuxl2jQNOGt',
      },
    };
    const user = await this.usersRepository.findById(Number(user_id));
    const session = await this.paymentProvider.createStripeUserSubscription(
      user.email,
      plans[plan_duration][plan_size],
    );
    return session;
  }
}

export { SubscribeUseCase };
