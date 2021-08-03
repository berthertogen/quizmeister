import { MessageStatus } from '@domain/infrastructure/message-status';
import { Quiz } from '../quiz/quiz';

export interface NewSubscriptionEvent {
  subscription: Subscription;
  status: MessageStatus;
  message: string;
}

export interface UpdateSubscriptionEvent {
  subscription: Subscription;
  status: MessageStatus;
  message: string;
}

export interface DeleteSubscriptionEvent {
  subscription: Subscription;
  status: MessageStatus;
  message: string;
}

export interface Subscription {
  default: boolean;
  subscriptionId: number;
  quiz: Quiz;
  status: SubscriptionStatus;
  email: string;
  team: string;

  answered: boolean;
}

export class SubscriptionDefault implements Subscription {
  default = true;
  subscriptionId: number;
  quiz: Quiz;
  status: SubscriptionStatus;
  email: string;
  team: string;
  answered: boolean;
}

/* eslint-disable no-shadow */
export enum SubscriptionStatus {
  new = 1,
  queued = 4,
  joined = 2,
  finished = 3,
}
