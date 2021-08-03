import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { TimerStepEvent } from './timer-step';
import { SignalRService } from '@domain/infrastructure/signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerStep = new Subject<TimerStepEvent>();

  constructor(private signalRService: SignalRService) {
    this.signalRService.addWatch('tick', (timerStep: TimerStepEvent) => this.timerStep.next(timerStep));
  }

  watch(quizId: number, questionId: number): Observable<TimerStepEvent> {
    return this.timerStep.pipe(
      tap((t) => console.log('pre', t)),
      filter((event: any) => event.step.quizId === quizId && event.step.questionId === questionId),
      tap((t) => console.log('post', t)),
    );
  }
}
