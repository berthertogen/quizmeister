import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@domain/infrastructure/snackbar.service';
import { displayQuizStatus, Quiz } from '@domain/quiz/quiz';
import { Subscription } from '@domain/subscriptions/subscription';
import { SubscriptionService } from '@domain/subscriptions/subscription.service';
import { query, QueryOutput, refreshQuery } from 'rx-query';
import { Observable } from 'rxjs';
import { first, tap, withLatestFrom } from 'rxjs/operators';
import { User } from '../login/user';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-my-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.sass'],
})
export class MyListComponent implements OnInit {
  subscriptions$: Observable<QueryOutput<Subscription[]>>;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private snackBarService: SnackbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.get();
    this.subscriptions$ = query('subscriptions', this.user$, (user) => this.subscriptionService.get(user.email));
  }

  status(quiz: Quiz): string {
    return displayQuizStatus(quiz.status);
  }

  unsubscribe(subscription: Subscription): void {
    this.subscriptionService
      .delete(subscription.subscriptionId)
      .pipe(
        first(),
        tap((_) => this.snackBarService.send(`Je hebt je team ${subscription.team} uitgeschreven voor ${subscription.quiz.title}`)),
        withLatestFrom(this.user$),
        tap((params) => refreshQuery('subscriptions', params[1])),
      )
      .subscribe();
  }

  participate(subscription: Subscription): void {
    this.subscriptionService
      .join(subscription)
      .pipe(
        first(),
        tap((output) =>
          this.snackBarService.send(`Je deelname met team ${output.subscription.team} is gestart voor ${output.subscription.quiz.title}`),
        ),
        tap((_) => this.router.navigate(['quiz', subscription.quiz.quizId])),
      )
      .subscribe();
  }

  quiz(subscription: Subscription): void {
    this.router.navigate(['quiz', subscription.quiz.quizId]);
  }
}
