import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QuizService } from '@domain/quiz/quiz.service';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  quizzes$: Observable<Quiz[]>;
  quiz$ = new BehaviorSubject<Quiz>(null);

  routerSubscription: Subscription;

  constructor(private quizService: QuizService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.data
      .pipe(filter((data) => data.quiz ?? false))
      .subscribe((data) => this.quiz$.next(data.quiz));
  }

  searching(term: string): void {
    this.quizzes$ = this.quizService.getAll(term);
  }

  selected(quiz: Quiz): void {
    this.router.navigate(['dashboard', 'list', quiz.quizId]);
  }

  step(input: { quiz: Quiz; status: number }): void {
    this.quizService.updateStatus(input.quiz.quizId, input.status).forEach((quiz) => this.quiz$.next(quiz));
  }
}
