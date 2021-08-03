import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CopyRoundModalComponent } from '../copy-round/copy-round-modal.component';
import { DeleteRoundModalComponent } from '../delete-round/delete-round-modal.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, filter, map, switchMap, tap, first, withLatestFrom } from 'rxjs/operators';
import { Round } from '@domain/round/round';
import { RoundService } from '@domain/round/round.service';
import { query, QueryOutput, refreshQuery } from 'rx-query';

@Component({
  selector: 'app-list-round',
  templateUrl: './list-round.component.html',
  styleUrls: ['./list-round.component.sass'],
})
export class ListRoundComponent implements OnInit {
  rounds$: Observable<QueryOutput<Round[]>>;
  search = new FormControl();
  searchTerm$: Observable<string>;

  constructor(private roundService: RoundService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchTerm$ = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map((value: string) => value),
    );
    this.rounds$ = query('rounds', this.searchTerm$, (searchTerm) => this.roundService.getAll(searchTerm));
  }

  delete(round: Round): void {
    this.dialog
      .open(DeleteRoundModalComponent, { data: round })
      .afterClosed()
      .pipe(
        filter((result) => result.delete),
        switchMap((result) => this.roundService.delete(round.roundId, result.deleteQuestions)),
        withLatestFrom(this.searchTerm$),
        tap(([_, searchTerm]) => refreshQuery('rounds', searchTerm)),
        first(),
      )
      .subscribe();
  }

  copy(round: Round): void {
    this.dialog
      .open(CopyRoundModalComponent, { data: round })
      .afterClosed()
      .pipe(
        filter((result) => result.copy),
        switchMap((result) => this.roundService.copy(round.roundId, result.questionIds)),
        withLatestFrom(this.searchTerm$),
        tap(([_, searchTerm]) => refreshQuery('rounds', searchTerm)),
        first(),
      )
      .subscribe();
  }
}
