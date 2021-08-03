import { Pipe, PipeTransform } from '@angular/core';
import { Subscription, SubscriptionStatus } from './subscription';

@Pipe({ name: 'subscriptionStatus' })
export class SubscriptionStatusPipe implements PipeTransform {
  transform(subscriptions: Subscription[], statusses: SubscriptionStatus[]): Subscription[] {
    return subscriptions.filter((subscription) => statusses.includes(subscription.status));
  }
}
