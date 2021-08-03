import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRService } from '@domain/infrastructure/signal-r.service';
import { SnackbarService } from '@domain/infrastructure/snackbar.service';
import { NextQuizRunStepEvent } from '@domain/quiz-run-steps/quiz-run-step';
import { QuizRunStepService } from '@domain/quiz-run-steps/quiz-run-step.service';
import { Quiz } from '@domain/quiz/quiz';
import { QuizService } from '@domain/quiz/quiz.service';
import { Subscription } from '@domain/subscriptions/subscription';
import { SubscriptionService } from '@domain/subscriptions/subscription.service';
import { query, QueryOutput } from 'rx-query';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { SendAnswer } from '@domain/quiz-run-steps/answer/answer-step';
import { User } from '../login/user';
import { UserService } from '../login/user.service';
import { AnswerService } from '../../../../domain/src/public-api';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass'],
})
export class QuizComponent implements OnInit {
  user$: Observable<User>;
  quiz$: Observable<QueryOutput<Quiz>>;
  currentStepEvent$: Observable<QueryOutput<NextQuizRunStepEvent>>;
  quizId: number;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private quizRunStepService: QuizRunStepService,
    private subscriptionService: SubscriptionService,
    private answerService: AnswerService,
    private snackBarService: SnackbarService,
    private signalRService: SignalRService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.get();
    if (this.activatedRoute.snapshot.params.quizId) {
      this.quizId = parseInt(this.activatedRoute.snapshot.params.quizId, 10);
      this.signalRService.subscribe(this.quizId);
      this.quiz$ = query('quiz', this.quizService.watchQuiz(this.quizId), (quiz) => of(quiz));
      this.currentStepEvent$ = query('quizRunStep', this.quizRunStepService.watchStep(this.quizId), (nextStep) => of(nextStep));
    }
  }

  participate(subscription: Subscription): void {
    this.subscriptionService
      .join(subscription)
      .pipe(
        first(),
        tap((output) =>
          this.snackBarService.send(`Je deelname met team ${output.subscription.team} is gestart voor ${output.subscription.quiz.title}`),
        ),
      )
      .subscribe();
  }

  sendAnswer(answer: SendAnswer): void {
    this.answerService
      .create(answer)
      .pipe(
        first(),
        tap((output) => this.snackBarService.send(`Je antwoord is vertuurd.`)),
      )
      .subscribe();
  }
}
