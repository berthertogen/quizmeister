import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  Subscription,
  NewSubscriptionEvent,
  UpdateSubscriptionEvent,
  SubscriptionStatus,
  DeleteSubscriptionEvent,
  SubscriptionDefault,
} from './subscription';
import { filter, switchMap, startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'projects/domain/src/lib/infrastructure/signal-r.service';
import { EnvService } from '@domain/infrastructure/env.service';
import { QuizStatus } from '@domain/quiz/quiz';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private newAndDeleteSubscriptions = new Subject<NewSubscriptionEvent>();
  private updateAndDeleteSubscriptions = new Subject<UpdateSubscriptionEvent>();

  constructor(private http: HttpClient, private env: EnvService, private signalRService: SignalRService) {
    this.signalRService.addWatch('newSubscription', this.newAndDeleteSubscriptions.next);
    this.signalRService.addWatch('updateSubscription', this.updateAndDeleteSubscriptions.next);
    this.signalRService.addWatch('deleteSubscription', (subscription: DeleteSubscriptionEvent) => {
      this.updateAndDeleteSubscriptions.next(subscription);
      this.newAndDeleteSubscriptions.next(subscription);
    });
  }

  getAll(quizId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.env.api}subscription/${quizId}`);
  }

  watchNewAndDelete(quizId: number): Observable<Subscription[]> {
    return this.watch(quizId, this.newAndDeleteSubscriptions);
  }

  watchUpdateAndDelete(quizId: number): Observable<Subscription[]> {
    return this.watch(quizId, this.updateAndDeleteSubscriptions);
  }

  delete(id: number): Observable<Subscription> {
    return this.http.delete<Subscription>(`${this.env.api}subscription/${id}`);
  }

  setToNew(id: number): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.env.api}subscription/${id}/status`, SubscriptionStatus.new);
  }

  getActive(email: string): Observable<Subscription> {
    return this.get(email).pipe(
      map((subscriptions) => {
        const started = subscriptions.filter(
          (subscription) => subscription.quiz.status === QuizStatus.started || subscription.quiz.status === QuizStatus.starting,
        );
        return started.length > 0 ? started[0] : new SubscriptionDefault();
      }),
    );
  }

  get(email: string): Observable<Subscription[]> {
    return this.http.post<Subscription[]>(`${this.env.api}subscription/email`, { email });
  }

  join(subscription: Subscription): Observable<UpdateSubscriptionEvent> {
    return this.http.put<UpdateSubscriptionEvent>(
      `${this.env.api}subscription/${subscription.subscriptionId}/status/`,
      SubscriptionStatus.joined,
    );
  }

  create(subscription: Subscription): Observable<NewSubscriptionEvent> {
    return this.http.post<NewSubscriptionEvent>(`${this.env.api}subscription/`, subscription);
  }

  private watch<T>(quizId: number, subject: Subject<T>): Observable<Subscription[]> {
    return subject.pipe(
      startWith({ subscription: { quiz: { quizId } } }),
      filter((event: any) => event.subscription.quiz.quizId === quizId),
      switchMap((_) => this.getAll(quizId)),
    );
  }
}
