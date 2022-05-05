import { SubscribeUseCase } from '@modules/payments/useCases/subscribe/SubscribeUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IPaymentProvider } from '@shared/container/providers/PaymentProvider/IPaymentProvider';
import { StripePaymentProvider } from '@shared/container/providers/PaymentProvider/implementations/StripePaymentProvider';

let subscribeUseCase: SubscribeUseCase;
let usersRepository: IUsersRepository;
let paymentProvider: IPaymentProvider;

describe('Organization payment and subscription', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    paymentProvider = new StripePaymentProvider();

    subscribeUseCase = new SubscribeUseCase(usersRepository, paymentProvider);
  });

  test.todo('should be able to subscribe to organization');
});
