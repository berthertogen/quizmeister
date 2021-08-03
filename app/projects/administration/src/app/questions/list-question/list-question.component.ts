import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionService } from '@domain/question/question.service';
import { Question } from '@domain/question/question';
import { query, QueryOutput, refreshQuery } from 'rx-query';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.sass'],
})
export class ListQuestionComponent implements OnInit {
  questions$: Observable<QueryOutput<Question[]>>;
  search = new FormControl();
  searchTerm$: Observable<string>;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.searchTerm$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map((value: string) => value),
    );
    this.questions$ = query('questions', this.searchTerm$, (searchTerm) => this.questionService.getAll(searchTerm));
  }

  delete(question: Question): void {
    this.questionService
      .delete(question.questionId)
      .pipe(
        tap((_) => refreshQuery('questions', this.search.value)),
        first(),
      )
      .subscribe();
  }

  copy(question: Question): void {
    this.questionService
      .copy(question.questionId)
      .pipe(
        tap((_) => refreshQuery('questions', this.search.value)),
        first(),
      )
      .subscribe();
  }
}
