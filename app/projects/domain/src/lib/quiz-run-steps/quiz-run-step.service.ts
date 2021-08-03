import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { NextQuizRunStepEvent } from './quiz-run-step';
import { startWith, filter, tap, switchMap } from 'rxjs/operators';
import { EnvService } from '@domain/infrastructure/env.service';
import { SignalRService } from '@domain/infrastructure/signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class QuizRunStepService {
  private nextQuizRunStep = new Subject<NextQuizRunStepEvent>();

  constructor(private http: HttpClient, private env: EnvService, private signalRService: SignalRService) {
    this.signalRService.addWatch('nextQuizRunStep', (quizRunStep: NextQuizRunStepEvent) => this.nextQuizRunStep.next(quizRunStep));
  }

  current(quizId: number): Observable<NextQuizRunStepEvent> {
    return this.http.get<NextQuizRunStepEvent>(`${this.env.api}quizrunstep/${quizId}/current`);
  }

  next(quizId: number): Observable<NextQuizRunStepEvent> {
    return this.http.get<NextQuizRunStepEvent>(`${this.env.api}quizrunstep/${quizId}/next`);
  }

  watchStep(quizId: number): Observable<NextQuizRunStepEvent> {
    return this.nextQuizRunStep.pipe(
      startWith({ step: { quiz: { quizId } } }),
      filter((event: NextQuizRunStepEvent) => event.step.quiz.quizId === quizId),
      tap((s) => console.log('new quiz step event:', s)),
      switchMap((event: NextQuizRunStepEvent) => (event.step.quizRunStepId ? of(event) : this.current(quizId))),
    );
  }
}
