import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Round } from './round';
import { EnvService } from '@domain/infrastructure/env.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getAll(term?: string, start?: number, count?: number): Observable<Round[]> {
    return this.http.get<Round[]>(`${this.env.api}round/search/${start || 0}/${count || 20}/${term || ''}`);
  }

  getForQuiz(quizId: number): Observable<Round[]> {
    return this.http.get<Round[]>(`${this.env.api}round/search/${quizId}`);
  }

  getOne(id: number): Observable<Round> {
    return this.http.get<Round>(`${this.env.api}round/${id}`);
  }

  getThemes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.env.api}round/themes`);
  }

  create(round: Round): Observable<Round> {
    return this.http.post<Round>(`${this.env.api}round`, {
      questionIds: round.questions.map((q) => q.questionId),
      ...round,
    });
  }

  update(id: number, round: Round): Observable<Round> {
    return this.http.put<Round>(`${this.env.api}round/${id}`, {
      questionIds: round.questions.map((q) => q.questionId),
      ...round,
    });
  }

  copy(id: number, roundIds: number[]): Observable<Round> {
    return this.http.put<Round>(`${this.env.api}round/${id}/copy`, roundIds || []);
  }

  delete(id: number, deleteRounds?: boolean): Observable<Round> {
    return this.http.delete<Round>(`${this.env.api}round/${id}/${deleteRounds || false}`);
  }
}
