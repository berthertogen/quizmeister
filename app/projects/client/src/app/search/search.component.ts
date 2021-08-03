import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '@domain/infrastructure/snackbar.service';
import { Quiz } from '@domain/quiz/quiz';
import { QuizService } from '@domain/quiz/quiz.service';
import { Subscription } from '@domain/subscriptions/subscription';
import { SubscriptionService } from '@domain/subscriptions/subscription.service';
import { query, QueryOutput, refreshQuery } from 'rx-query';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { User } from '../login/user';
import { UserService } from '../login/user.service';
import { SubscribeComponent } from './subscribe/subscribe.component';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  activeQuizzes$: Observable<QueryOutput<Quiz[]>>;
  user$: Observable<User>;
  params$: Observable<{ email: string; term: string }>;
  search = new FormControl();
  searchTerm$: Observable<string>;

  constructor(
    private quizService: QuizService,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.searchTerm$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map((value: string) => value),
    );
    this.user$ = this.userService.get();
    this.params$ = combineLatest([this.user$, this.searchTerm$]).pipe(map((value) => ({ email: value[0].email, term: value[1] })));
    this.activeQuizzes$ = query('quizzes', this.params$, (params) => this.quizService.getOpen(params));
  }

  subscribe(quiz: Quiz, user: User): void {
    this.dialog
      .open(SubscribeComponent, { data: { quiz, user } })
      .afterClosed()
      .pipe(
        filter((output) => !!output),
        switchMap((output: { quiz: Quiz; subscription: Subscription }) => this.subscriptionService.create(output.subscription)),
        first(),
        tap((output) =>
          this.snackBarService.send(`Je hebt ${output.subscription.team} ingeschreven voor ${output.subscription.quiz.title}`),
        ),
        withLatestFrom(this.params$),
        tap((params) => refreshQuery('quizzes', params[1])),
      )
      .subscribe();
  }
}
