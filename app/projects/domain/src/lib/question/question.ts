import { Round } from '@domain/round/round';

export interface Question {
  questionId: number;
  shortId: string;
  title: string;
  type: QuestionTypes;
  typeName: string;
  remark: string;
  modifiedOn: Date;
  rounds: Round[];
  answers: Answer[];
  scoring: Scoring;
}

export class QuestionDefault implements Question {
  questionId = 0;
  shortId: string = null;
  title: string = null;
  type = QuestionTypes.open;
  typeName: string = null;
  remark: string = null;
  modifiedOn: Date = new Date();
  rounds: Round[] = [];
  answers: Answer[] = [];
  scoring = new ScoringDefault();
}

export interface Answer {
  answerId: number;
  text: string;
  correct: boolean;
}

export class AnswerDefault implements Answer {
  answerId: number = null;
  text: string = null;
  correct = true;
}

export interface Scoring {
  type: ScoringTypes;
  weightCorrectAnswer: number;
  weightNoAnswer: number;
  timeLimitSeconds: number;
  timeScoringInterval: number;
}

export class ScoringDefault implements Scoring {
  type = ScoringTypes.correctAnswer;
  weightCorrectAnswer = 1;
  weightNoAnswer = 0;
  timeLimitSeconds = 0;
  timeScoringInterval = 0;
}

/* eslint-disable no-shadow */
export enum ScoringTypes {
  correctAnswer = 1, // 'Per correct antwoord',
  timeToComplete = 2, // 'Tijdsscoring',
  uniqueKnowledge = 3, // 'Unieke kennis',
}

export const displayScoringTypes = (type: ScoringTypes): string | null => {
  if (!type) {
    return null;
  }
  switch (type) {
    case ScoringTypes.correctAnswer:
      return 'Per correct antwoord';
    case ScoringTypes.timeToComplete:
      return 'Tijdsscoring';
    case ScoringTypes.uniqueKnowledge:
      return 'Unieke kennis';
    default:
      console.error(`enum type ${type} not supported`);
      break;
  }
};

/* eslint-disable no-shadow */
export enum QuestionTypes {
  open = 1, // 'Open',
  multipleChoise = 2, // 'Meerkeuze',
}

export const displayQuestionTypes = (type: QuestionTypes): string | null => {
  if (!type) {
    return null;
  }
  switch (type) {
    case QuestionTypes.open:
      return 'Open';
    case QuestionTypes.multipleChoise:
      return 'Meerkeuze';
    default:
      console.error(`enum type ${type} not supported`);
      break;
  }
};
