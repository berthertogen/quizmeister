import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { Observable } from 'rxjs';
import { EnvService } from '@domain/infrastructure/env.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getAll(term?: string, start?: number, count?: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.env.api}question/search/${start || 0}/${count || 20}/${term || ''}`);
  }

  getOne(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.env.api}question/${id}`);
  }

  create(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.env.api}question`, question);
  }

  update(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.env.api}question/${id}`, question);
  }

  copy(id: number): Observable<Question> {
    return this.http.put<Question>(`${this.env.api}question/${id}/copy`, null);
  }

  delete(id: number): Observable<Question> {
    return this.http.delete<Question>(`${this.env.api}question/${id}`);
  }
}
