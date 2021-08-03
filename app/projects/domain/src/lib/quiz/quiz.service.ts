import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz, QuizEvent, QuizStatus } from './quiz';
import { Observable, of, Subject } from 'rxjs';
import { EnvService } from '@domain/infrastructure/env.service';
import { catchError, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MessageStatus } from '@domain/infrastructure/message-status';
import { SignalRService } from '@domain/infrastructure/signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizEvent = new Subject<QuizEvent>();

  constructor(private http: HttpClient, private env: EnvService, private signalRService: SignalRService) {
    this.signalRService.addWatch('nextQuizStatus', (quiz: QuizEvent) => this.quizEvent.next(quiz));
  }

  getAll(term?: string, start?: number, count?: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.env.api}quiz/search/${start || 0}/${count || 20}/${term || ''}`);
  }

  getOpen(input: { term?: string; start?: number; count?: number; email?: string }): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.env.api}quiz/open/${input.start || 0}/${input.count || 20}/${input.term || ''}`).pipe(
      map((quizzes) =>
        quizzes.map((quiz) => {
          quiz.subscibed = quiz.subscriptions.findIndex((subscription) => subscription.email === input.email) >= 0;
          return quiz;
        }),
      ),
    );
  }

  getOne(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.env.api}quiz/${quizId}`).pipe(catchError((e) => of(null)));
  }

  getOneShort(shortId: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.env.api}quiz/short/${shortId}`).pipe(catchError((e) => of(null)));
  }

  create(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.env.api}quiz`, {
      roundIds: quiz.rounds.map((r) => r.roundId),
      ...quiz,
    });
  }

  update(id: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.env.api}quiz/${id}`, {
      roundIds: quiz.rounds.map((r) => r.roundId),
      ...quiz,
    });
  }

  updateStatus(id: number, status: QuizStatus): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.env.api}quiz/${id}/status`, status);
  }

  copy(id: number, roundIds: number[]): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.env.api}quiz/${id}/copy`, roundIds || []);
  }

  delete(id: number, deleteRounds?: boolean): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.env.api}quiz/${id}/${deleteRounds || false}`);
  }

  watchQuiz(quizId: number): Observable<Quiz> {
    return this.quizEvent.pipe(
      tap((quiz) => console.log('new quiz event:', quiz)),
      startWith({ quiz: { quizId } }),
      filter((event: QuizEvent) => event.quiz.quizId === quizId),
      switchMap((event: QuizEvent) => (event.status === MessageStatus.success ? of(event.quiz) : this.getOne(quizId))),
    );
  }
}
