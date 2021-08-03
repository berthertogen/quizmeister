import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Round } from '@domain/round/round';
import { Question } from '@domain/question/question';
import { RoundService } from '@domain/round/round.service';
import { QuestionService } from '@domain/question/question.service';

@Component({
  selector: 'app-edit-round',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.sass'],
})
export class EditRoundComponent implements OnInit {
  round: Observable<Round>;
  questions$ = new Subject<Question[]>();
  themes: Observable<string[]>;

  constructor(
    private roundService: RoundService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.round = this.activatedRoute.snapshot.data.round;
    this.themes = this.roundService.getThemes();
  }

  save(input: { roundId: number; round: Round }): void {
    this.roundService
      .update(input.roundId, input.round)
      .forEach(() => this.router.navigate(['../../list'], { relativeTo: this.activatedRoute }));
  }

  filter(searchTerm: string): void {
    this.questionService.getAll(searchTerm).forEach((questions) => this.questions$.next(questions));
  }
}
