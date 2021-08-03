import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Quiz, QuizStatus, displayQuizStatus } from '@domain/quiz/quiz';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.sass'],
})
export class QuizSelectorComponent implements OnInit {
  @Input() quizzes: Quiz[];

  @Output() searching = new EventEmitter<string>();
  @Output() selected = new EventEmitter<Quiz>();

  search = new FormControl(null);

  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value && typeof value === 'string'),
      )
      .forEach((value) => this.searching.emit(value));
    this.search.valueChanges.pipe(filter((value) => value && typeof value === 'object')).forEach((value) => this.selected.emit(value));
  }

  displayFn(_: Quiz): string {
    return '';
  }

  displayQuizStatus(status: QuizStatus): string {
    return displayQuizStatus(status);
  }
}
