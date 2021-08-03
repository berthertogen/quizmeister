import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query, QueryOutput } from 'rx-query';
import { Observable, of } from 'rxjs';
import { SignalRService } from '../../../../domain/src/lib/infrastructure/signal-r.service';
import { NextQuizRunStepEvent } from '../../../../domain/src/lib/quiz-run-steps/quiz-run-step';
import { QuizRunStepService } from '../../../../domain/src/lib/quiz-run-steps/quiz-run-step.service';
import { Quiz } from '../../../../domain/src/lib/quiz/quiz';
import { QuizService } from '../../../../domain/src/lib/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass'],
})
export class QuizComponent implements OnInit {
  quiz$: Observable<QueryOutput<Quiz>>;
  currentStepEvent$: Observable<QueryOutput<NextQuizRunStepEvent>>;
  quizId: number;

  constructor(
    private quizService: QuizService,
    private quizRunStepService: QuizRunStepService,
    private signalRService: SignalRService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.data.quiz.quizId;
    if (!this.quizId) {
      this.router.navigate(['find-quiz']);
    } else {
      this.signalRService.subscribe(this.quizId);
      this.quiz$ = query('quiz', this.quizService.watchQuiz(this.quizId), (quiz) => of(quiz));
      this.currentStepEvent$ = query('quizRunStep', this.quizRunStepService.watchStep(this.quizId), (nextStep) => of(nextStep));
    }
  }
}
