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
    price_id: string,
  ): Promise<Stripe.Checkout.Session> {
    const user = await this.usersRepository.findById(Number(user_id));
    const session = await this.paymentProvider.createStripeUserSubscription(
      user.email,
      price_id,
    );
    return session;
  }
}

export { SubscribeUseCase };
