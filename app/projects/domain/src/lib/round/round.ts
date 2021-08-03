import { Question } from '../question/question';

export interface Round {
  roundId: number;
  shortId: string;
  title: string;
  theme: string;
  remark: string;
  modifiedOn: Date;
  questions: Question[];
}
