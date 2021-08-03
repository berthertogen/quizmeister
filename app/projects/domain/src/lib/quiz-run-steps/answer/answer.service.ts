import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '@domain/infrastructure/env.service';
import { SendAnswer, AnswerStepEvent } from './answer-step';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient, private env: EnvService) {}

  create(answer: SendAnswer): Observable<AnswerStepEvent> {
    return this.http.post<AnswerStepEvent>(`${this.env.api}answer`, answer);
  }
}
