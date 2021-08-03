import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { QuestionTypes } from '@domain/question/question';
import { SendAnswer } from '@domain/quiz-run-steps/answer/answer-step';
import { NextQuizRunStepEvent } from '@domain/quiz-run-steps/quiz-run-step';
import { Quiz } from '@domain/quiz/quiz';
import { QueryOutput } from 'rx-query';
import { User } from '../../login/user';

@Component({
  selector: 'app-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './started.component.html',
  styleUrls: ['./started.component.sass'],
})
export class StartedComponent implements OnChanges {
  @Input() quiz: Quiz;
  @Input() user: User;
  @Input() currentStepEvent: QueryOutput<NextQuizRunStepEvent>;

  @Output() sendAnswer = new EventEmitter<SendAnswer>();

  answer: string;
  disabled: boolean;
  answeredCount = 0;
  answeredPercentage = 0;

  constructor() {}

  ngOnChanges(): void {
    if (this.quiz && this.quiz.subscriptions && this.user) {
      this.disabled = this.answeredByMe();
      const answeredBy = this.currentStepEvent?.data?.step?.answeredBy;
      if (answeredBy && answeredBy.length) {
        console.log('Changed');
        this.answeredCount = answeredBy.length;
        this.answeredPercentage = (answeredBy.length / this.quiz.subscriptions.length) * 100;
      } else {
        this.answeredCount = 0;
        this.answeredPercentage = 0;
      }
    }
  }

  public get questionTypes(): typeof QuestionTypes {
    return QuestionTypes;
  }

  send(): void {
    const subscription = this.quiz.subscriptions.find((s) => s.email === this.user.email);
    this.sendAnswer.emit({
      answer: this.answer,
      quizId: this.quiz.quizId,
      quizRunStepId: this.currentStepEvent.data.step.quizRunStepId,
      subscriptionId: subscription.subscriptionId,
    });
  }

  answeredByMe(): boolean {
    const subscription = this.quiz.subscriptions.find((s) => s.email === this.user.email);
    return this.currentStepEvent?.data?.step?.answeredBy?.findIndex((a) => a.subscriptionId === subscription.subscriptionId) >= 0;
  }
}
