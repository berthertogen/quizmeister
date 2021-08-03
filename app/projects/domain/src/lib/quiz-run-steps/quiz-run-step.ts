import { MessageStatus } from '@domain/infrastructure/message-status';
import { Question } from '../question/question';
import { Quiz } from '../quiz/quiz';
import { Round } from '../round/round';
import { Subscription } from '../subscriptions/subscription';

export interface NextQuizRunStepEvent {
  previousStep: QuizRunStep;
  step: QuizRunStep;
  status: MessageStatus;
  message: string;
}

export interface QuizRunStep {
  quizRunStepId: number;
  sendOn: Date;
  status: QuizRunStepStatus;
  quiz: Quiz;
  round: Round;
  question: Question;
  answeredBy: Subscription[];
  answers: string[];
  scores: QuizRunScore[];
}

export interface QuizRunScore {
  subscription: Subscription;
  total: number;
}

/* eslint-disable no-shadow */
export enum QuizRunStepStatus {
  question = 1,
  answers = 2,
  score = 3,
  ended = 4,
}
