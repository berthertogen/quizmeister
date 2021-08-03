import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Quiz, displayQuizStatus, QuizStatus } from '@domain/quiz/quiz';
import { SubscriptionService } from '@domain/subscriptions/subscription.service';
import { Subscription } from '@domain/subscriptions/subscription';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoundService } from '@domain/round/round.service';
import { QuizRunStepService } from '@domain/quiz-run-steps/quiz-run-step.service';
import { NextQuizRunStepEvent } from '@domain/quiz-run-steps/quiz-run-step';
import { Round } from '@domain/round/round';
import { SignalRService } from 'projects/domain/src/lib/infrastructure/signal-r.service';

@Component({
  selector: 'app-quiz-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz-stepper.component.html',
  styleUrls: ['./quiz-stepper.component.sass'],
})
export class QuizStepperComponent implements OnChanges, OnDestroy {
  @Input() quiz: Quiz;

  @Output() step = new EventEmitter<{ quiz: Quiz; status: number }>();

  newSubscriptions$: Observable<Subscription[]>;
  updateSubscriptions$: Observable<Subscription[]>;
  currentStepEvent$: Observable<NextQuizRunStepEvent>;
  rounds$ = new BehaviorSubject<Round[]>([]);
  statusInit: { [key: number]: () => void } = {};

  constructor(
    private subscriptionService: SubscriptionService,
    private quizRunStepService: QuizRunStepService,
    private roundService: RoundService,
    private signalRService: SignalRService,
  ) {
    this.statusInit[QuizStatus.open] = this.initStepOpen;
    this.statusInit[QuizStatus.closed] = this.initStepOpen;
    this.statusInit[QuizStatus.starting] = this.initStepStarting;
    this.statusInit[QuizStatus.started] = this.initStepStarted;
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.quiz) {
      if (change.quiz.previousValue && change.quiz.currentValue.quizId !== change.quiz.previousValue.quizId) {
        this.signalRService.unsubscribe(change.quiz.previousValue.quizId);
      }
      this.signalRService.subscribe(change.quiz.currentValue.quizId);
      this.initStep();
    }
  }

  ngOnDestroy(): void {
    this.signalRService.unsubscribe(this.quiz.quizId);
  }

  nextStep(): void {
    this.step.emit({ quiz: this.quiz, status: this.quiz.status + 1 });
  }

  prevStep(): void {
    this.step.emit({ quiz: this.quiz, status: this.quiz.status - 1 });
  }

  displayQuizStatus(status: QuizStatus): string {
    return displayQuizStatus(status);
  }

  deleteSubscription(subscription: Subscription): void {
    this.subscriptionService.delete(subscription.subscriptionId).forEach(() => this.initStep());
  }

  newSubscription(subscription: Subscription): void {
    this.subscriptionService.setToNew(subscription.subscriptionId).forEach(() => this.initStep());
  }

  nextQuizStep(quiz: Quiz): void {
    this.quizRunStepService.next(quiz.quizId).forEach(() => this.initStep());
  }

  private initStep(): void {
    const init = this.statusInit[this.quiz.status];
    if (init) {
      init.call(this);
    }
  }

  private initStepOpen(): void {
    this.newSubscriptions$ = this.subscriptionService.watchNewAndDelete(this.quiz.quizId);
  }

  private initStepStarting(): void {
    this.updateSubscriptions$ = this.subscriptionService.watchUpdateAndDelete(this.quiz.quizId);
  }

  private initStepStarted(): void {
    this.roundService.getForQuiz(this.quiz.quizId).forEach((rounds) => this.rounds$.next(rounds));
    this.currentStepEvent$ = this.quizRunStepService.watchStep(this.quiz.quizId);
  }
}
