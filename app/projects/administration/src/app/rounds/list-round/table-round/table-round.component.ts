import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Round } from '@domain/round/round';

@Component({
  selector: 'app-table-round',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-round.component.html',
  styleUrls: ['./table-round.component.sass'],
})
export class TableRoundComponent implements OnInit, OnChanges {
  @Input() rounds: Round[] = [];

  @Output() copyRound = new EventEmitter<Round>();
  @Output() deleteRound = new EventEmitter<Round>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayColumns: string[] = ['id', 'title', 'theme', 'numberOfRounds', 'modifiedOn', 'actions'];
  dataSource = new MatTableDataSource([]);

  constructor() {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rounds && changes.rounds.currentValue) {
      this.dataSource.data = this.rounds;
    }
  }
}
