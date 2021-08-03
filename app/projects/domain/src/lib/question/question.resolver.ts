import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Question } from './question';
import { QuestionService } from './question.service';

@Injectable()
export class QuestionResolver implements Resolve<any> {
  constructor(private questionService: QuestionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Question> {
    return this.questionService.getOne(parseInt(route.paramMap.get('questionId'), 10)).pipe(take(1));
  }
}
