import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { QuizService } from './quiz.service';
import { Observable, of } from 'rxjs';
import { Quiz } from './quiz';

@Injectable({ providedIn: 'root' })
export class QuizResolver implements Resolve<Quiz> {
  constructor(private quizService: QuizService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Quiz> {
    if (route.paramMap.get('quizId')) {
      return this.quizService.getOne(parseInt(route.paramMap.get('quizId'), 10)).pipe(take(1));
    }
    if (route.paramMap.get('shortId')) {
      return this.quizService.getOneShort(route.paramMap.get('shortId')).pipe(take(1));
    }
    return of(null);
  }
}
