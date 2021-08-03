import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Round } from '@domain/round/round';
import { Quiz } from '@domain/quiz/quiz';
import { QuizService } from '@domain/quiz/quiz.service';
import { RoundService } from '@domain/round/round.service';

@Component({
  selector: 'app-add-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.sass'],
})
export class AddQuizComponent {
  quiz: Quiz = { rounds: [] } as Quiz;
  rounds$ = new Subject<Round[]>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private roundService: RoundService,
  ) {}

  save(input: { quizId: string; quiz: Quiz }): void {
    this.quizService.create(input.quiz).forEach((_) => this.router.navigate(['../list'], { relativeTo: this.activatedRoute }));
  }

  filter(searchTerm: string): void {
    this.roundService.getAll(searchTerm).forEach((rounds) => this.rounds$.next(rounds));
  }
}
