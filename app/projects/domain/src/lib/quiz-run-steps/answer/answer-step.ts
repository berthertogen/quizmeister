import { MessageStatus } from '@domain/infrastructure/message-status';
import { Subscription } from '../../subscriptions/subscription';

export interface AnswerStepEvent {
  answer: AnswerStep;
  status: MessageStatus;
  message: string;
}

export interface AnswerStep {
  quizId: number;
  questionId: number;
  quizRunStepId: number;
  subscription: Subscription;
}

export interface SendAnswer {
  quizId: number;
  quizRunStepId: number;
  subscriptionId: number;
  answer: string;
}
