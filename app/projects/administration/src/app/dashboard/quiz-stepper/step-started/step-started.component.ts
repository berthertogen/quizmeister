import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Quiz } from '@domain/quiz/quiz';
import { Round } from '@domain/round/round';
import { NextQuizRunStepEvent, QuizRunStepStatus } from '@domain/quiz-run-steps/quiz-run-step';
import { TimerStepEvent } from '@domain/quiz-run-steps/timer/timer-step';
import { Subscription, BehaviorSubject } from 'rxjs';
import { TimerService } from '@domain/quiz-run-steps/timer/timer.service';

@Component({
  selector: 'app-step-started',
  templateUrl: './step-started.component.html',
  styleUrls: ['./step-started.component.sass'],
})
export class StepStartedComponent implements OnChanges, OnDestroy {
  @Input() quiz: Quiz;
  @Input() rounds: Round[];
  @Input() currentStepEvent: NextQuizRunStepEvent;

  @Output() next = new EventEmitter<Quiz>();

  nextQuestion = null;
  previousQuestion = null;
  questions = false;
  answers = false;
  score = false;
  timerSteps$ = new BehaviorSubject<TimerStepEvent>(null);

  timerSubscription: Subscription;

  constructor(private timerService: TimerService) {}

  ngOnChanges(_: SimpleChanges): void {
    if (this.currentStepEvent.step) {
      this.questions = this.currentStepEvent.step.status === QuizRunStepStatus.question;
      this.answers = this.currentStepEvent.step.status === QuizRunStepStatus.answers;
      this.score = this.currentStepEvent.step.status === QuizRunStepStatus.score;

      if (this.currentStepEvent.step.question) {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
        this.timerSubscription = this.timerService
          .watch(this.quiz.quizId, this.currentStepEvent.step.question.questionId)
          .subscribe(this.timerSteps$.next);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  lastQuestion(round: Round): boolean {
    return (
      round &&
      this.currentStepEvent &&
      this.currentStepEvent.step &&
      this.currentStepEvent.step.question &&
      this.currentStepEvent.step.question.questionId === round.questions[round.questions.length - 1].questionId
    );
  }

  showAnswers(): void {
    this.answers = true;
  }

  public get quizRunStepStatus(): typeof QuizRunStepStatus {
    return QuizRunStepStatus;
  }
}
