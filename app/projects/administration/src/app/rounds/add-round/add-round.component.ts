import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Round } from '@domain/round/round';
import { Observable, Subject } from 'rxjs';
import { Question } from '@domain/question/question';
import { RoundService } from '@domain/round/round.service';
import { QuestionService } from '@domain/question/question.service';

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-round.component.sass'],
})
export class AddRoundComponent implements OnInit {
  round: Round = { questions: [] } as Round;
  questions$ = new Subject<Question[]>();
  themes: Observable<string[]>;

  constructor(
    private roundservice: RoundService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.themes = this.roundservice.getThemes();
  }

  save(input: { roundId: string; round: Round }): void {
    this.roundservice.create(input.round).forEach(() => this.router.navigate(['../list'], { relativeTo: this.activatedRoute }));
  }

  filter(searchTerm: string): void {
    this.questionService.getAll(searchTerm).forEach((questions) => this.questions$.next(questions));
  }
}
