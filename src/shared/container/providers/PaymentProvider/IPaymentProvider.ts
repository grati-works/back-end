import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { Readable } from 'stream';
import Stripe from 'stripe';

interface IPaymentProvider {
  getInstance(): Promise<Stripe>;
  createStripeUserSubscription(
    email: string,
    plan_price_id: string,
  ): Promise<Stripe.Checkout.Session>;
  saveSubscription(
    subscription_id: string,
    stripe_customer_id: string,
    organization_id: number,
    max_users: number,
  ): Promise<void>;
  updateSubscription(
    subscription_id: string,
    stripe_customer_id: string,
    organization_id: number,
    max_users: number,
  ): Promise<void>;
  getSubscriptionData(
    subscription_id: string,
    stripe_customer_id: string,
    organization_id: number,
    max_users: number,
  ): Promise<Prisma.SubscriptionUncheckedCreateInput>;
  buffer(readble: Readable): Promise<Buffer>;
  webhookSetup(req: Request): Promise<boolean>;
}

export { IPaymentProvider };
