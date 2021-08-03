import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Round } from '@domain/round/round';
import { Quiz } from '@domain/quiz/quiz';
import { RoundService } from '@domain/round/round.service';
import { QuizService } from '@domain/quiz/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.sass'],
})
export class EditQuizComponent implements OnInit {
  quiz: Observable<Quiz>;
  rounds$ = new Subject<Round[]>();

  constructor(
    private quizService: QuizService,
    private roundService: RoundService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.quiz = this.activatedRoute.snapshot.data.quiz;
  }

  save(input: { quizId: number; quiz: Quiz }): void {
    this.quizService
      .update(input.quizId, input.quiz)
      .forEach(() => this.router.navigate(['../../list'], { relativeTo: this.activatedRoute }));
  }

  filter(searchTerm: string): void {
    this.roundService.getAll(searchTerm).forEach((rounds) => this.rounds$.next(rounds));
  }
}
