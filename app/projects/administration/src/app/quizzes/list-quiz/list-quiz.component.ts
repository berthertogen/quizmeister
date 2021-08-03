import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, filter, map, switchMap, withLatestFrom, tap, first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteQuizModalComponent } from '../delete-quiz/delete-quiz-modal.component';
import { CopyQuizModalComponent } from '../copy-quiz/copy-quiz-modal.component';
import { Quiz } from '@domain/quiz/quiz';
import { QuizService } from '@domain/quiz/quiz.service';
import { query, QueryOutput, refreshQuery } from 'rx-query';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.sass'],
})
export class ListQuizComponent implements OnInit {
  quizzes$: Observable<QueryOutput<Quiz[]>>;
  search = new FormControl();
  searchTerm$: Observable<string>;

  constructor(public dialog: MatDialog, private quizService: QuizService) {}

  ngOnInit(): void {
    this.searchTerm$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map((value: string) => value),
    );
    this.quizzes$ = query('quizzes', this.searchTerm$, (searchTerm) => this.quizService.getAll(searchTerm));
  }

  delete(quiz: Quiz): void {
    this.dialog
      .open(DeleteQuizModalComponent, { data: quiz })
      .afterClosed()
      .pipe(
        filter((result) => result.delete),
        switchMap((result) => this.quizService.delete(quiz.quizId, result.deleteRounds)),
        withLatestFrom(this.searchTerm$),
        tap(([_, searchTerm]) => refreshQuery('quizzes', searchTerm)),
        first(),
      )
      .subscribe();
  }

  copy(quiz: Quiz): void {
    this.dialog
      .open(CopyQuizModalComponent, { data: quiz })
      .afterClosed()
      .pipe(
        filter((result) => result.copy),
        switchMap((result) => this.quizService.copy(quiz.quizId, result.roundIds)),
        withLatestFrom(this.searchTerm$),
        tap(([_, searchTerm]) => refreshQuery('quizzes', searchTerm)),
        first(),
      )
      .subscribe();
  }
}
