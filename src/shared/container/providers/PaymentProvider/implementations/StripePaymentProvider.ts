import Stripe from 'stripe';
import { client } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';
import { Readable } from 'stream';
import { AppError } from '@shared/errors/AppError';
import { Request } from 'express';
import axios from 'axios';
import { logger } from '@utils/logger';
import { IPaymentProvider } from '../IPaymentProvider';
import { version } from '../../../../../../package.json';

class StripePaymentProvider implements IPaymentProvider {
  config = {
    api: {
      bodyParser: false,
    },
  };

  relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
  ]);

  stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Grati',
      version,
    },
  });

  async getInstance(): Promise<Stripe> {
    return this.stripe;
  }

  async createStripeUserSubscription(
    email: string,
    plan_price_id: string,
  ): Promise<Stripe.Checkout.Session> {
    const stripeClient = await this.getInstance();
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    let customerId = user.stripe_customer_id;

    if (customerId === null) {
      const stripeCustumer = await stripeClient.customers.create({
        email,
      });

      await client.user.update({
        where: {
          email,
        },
        data: {
          stripe_customer_id: stripeCustumer.id,
        },
      });

      customerId = stripeCustumer.id;
    }

    const stripeCheckoutSession = await stripeClient.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: plan_price_id, quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return stripeCheckoutSession;
  }

  async saveSubscription(
    subscription_id: string,
    stripe_customer_id: string,
    max_users = 100,
  ): Promise<void> {
    const organization_id = null;
    const subscriptionData = await this.getSubscriptionData(
      subscription_id,
      stripe_customer_id,
      organization_id,
      max_users,
    );

    await client.subscription.create({
      data: subscriptionData,
    });
  }

  async updateSubscription(
    subscription_id: string,
    stripe_customer_id: string,
    organization_id: number,
    max_users = 100,
  ): Promise<void> {
    const subscriptionData = await this.getSubscriptionData(
      subscription_id,
      stripe_customer_id,
      organization_id,
      max_users,
    );

    await client.subscription.update({
      where: {
        payment_ref: subscription_id,
      },
      data: subscriptionData,
    });
  }

  async getSubscriptionData(
    subscription_id: string,
    stripe_customer_id: string,
    organization_id = null,
    max_users = 100,
  ): Promise<Prisma.SubscriptionUncheckedCreateInput> {
    const stripeClient = await this.getInstance();
    const userRef = await client.user.findUnique({
      where: {
        stripe_customer_id,
      },
    });

    const subscription = await stripeClient.subscriptions.retrieve(
      subscription_id,
    );

    const subscriptionData: Prisma.SubscriptionUncheckedCreateInput = {
      payment_ref: subscription.id,
      user_id: userRef.id,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      organization_id,
      max_users,
    };

    return subscriptionData;
  }

  async buffer(readble: Readable): Promise<Buffer> {
    const chunks = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const chunk of readble) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks);
  }

  async webhookSetup(req: Request): Promise<boolean> {
    const stripeClient = await this.getInstance();
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripeClient.webhooks.constructEvent(
        req.rawBody,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      throw new AppError(
        `Webhook error: ${err.message}`,
        400,
        'stripe.webhook',
      );
    }

    const { type } = event;
    if (this.relevantEvents.has(type)) {
      try {
        let user;
        let subscriptionData;
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            // eslint-disable-next-line no-case-declarations
            const subscription = event.data.object as Stripe.Subscription;

            subscriptionData = await client.subscription.findUnique({
              where: {
                payment_ref: subscription.id,
              },
            });

            await this.updateSubscription(
              subscription.id,
              subscription.customer.toString(),
              subscriptionData.organization_id,
            );
            break;
          case 'checkout.session.completed':
            // eslint-disable-next-line no-case-declarations
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await this.saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
            );

            user = await client.user.findUnique({
              where: {
                stripe_customer_id: checkoutSession.customer.toString(),
              },
            });

            try {
              await axios.post(
                `http://localhost:${process.env.PORT}/organization/${user.id}`,
                {
                  name: `Organização de ${user.name}`,
                },
              );
            } catch (err) {
              logger.error(err);
            }
            break;
          default:
            throw new AppError(
              'Unhandled event.',
              400,
              'stripe.webhook.unhandled',
            );
            break;

            return true;
        }
      } catch (err) {
        throw new AppError(
          'Webhook handler failed',
          400,
          'stripe.webhook.handler',
        );
        return false;
      }
    }

    return true;
  }
}

export { StripePaymentProvider };
