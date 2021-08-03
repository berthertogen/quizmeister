import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from '@domain/question/question';

@Component({
  selector: 'app-table-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-question.component.html',
  styleUrls: ['./table-question.component.sass'],
})
export class TableQuestionComponent implements OnInit, OnChanges {
  @Input() questions: Question[] = [];

  @Output() copyQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<Question>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayColumns: string[] = ['id', 'title', 'type', 'modifiedOn', 'actions'];
  dataSource = new MatTableDataSource([]);

  constructor() {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.questions && changes.questions.currentValue) {
      this.dataSource.data = this.questions;
    }
  }
}
