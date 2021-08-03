import { MessageStatus } from '@domain/infrastructure/message-status';

export interface TimerStepEvent {
  step: TimerStep;
  status: MessageStatus;
  message: string;
}

export interface TimerStep {
  questionId: number;
  quizId: number;
  total: number;
  current: number;
  percentage: number;
}
