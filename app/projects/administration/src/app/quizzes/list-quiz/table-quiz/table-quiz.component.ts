import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-table-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-quiz.component.html',
  styleUrls: ['./table-quiz.component.sass'],
})
export class TableQuizComponent implements OnInit, OnChanges {
  @Input() quizzes: Quiz[] = [];

  @Output() copyQuiz = new EventEmitter<Quiz>();
  @Output() deleteQuiz = new EventEmitter<Quiz>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayColumns: string[] = ['id', 'title', 'date', 'location', 'numberOfRounds', 'maxSubscriptions', 'modifiedOn', 'actions'];
  dataSource = new MatTableDataSource([]);

  constructor() {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quizzes && changes.quizzes.currentValue) {
      this.dataSource.data = this.quizzes;
    }
  }
}
