import { MessageStatus } from '@domain/infrastructure/message-status';
import { Round } from '@domain/round/round';
import { Subscription } from '@domain/subscriptions/subscription';

export interface QuizEvent {
  quiz: Quiz;
  status: MessageStatus;
  message: string;
}

export interface Quiz {
  quizId: number;
  shortId: string;
  title: string;
  date: Date;
  location: string;
  status: QuizStatus;
  maxSubscriptions: number;
  remark: string;
  numberOfRounds: number;
  modifiedOn: Date;
  rounds: Round[];
  subscriptions: Subscription[];

  subscibed: boolean;
}

/* eslint-disable no-shadow */
export enum QuizStatus {
  new = 1,
  open = 2,
  closed = 3,
  starting = 4,
  started = 5,
  finished = 6,
}

/* eslint-disable no-shadow */
export enum QuizStatusDisplay {
  nieuw = 1,
  open = 2,
  gesloten = 3,
  starten = 4,
  gestart = 5,
  afgesloten = 6,
}

export const displayQuizStatus = (status: QuizStatus): string => QuizStatusDisplay[status];
