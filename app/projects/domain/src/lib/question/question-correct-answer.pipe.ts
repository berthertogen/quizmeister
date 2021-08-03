import { Pipe, PipeTransform } from '@angular/core';
import { Answer, Question } from './question';

@Pipe({ name: 'questionCorrectAnswer' })
export class QuestionCorrectAnswerPipe implements PipeTransform {
  transform(question: Question): Answer | null {
    return question && question.answers ? question.answers.find((answer) => answer.correct) : null;
  }
}
