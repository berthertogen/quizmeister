import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Round } from './round';
import { RoundService } from './round.service';

@Injectable()
export class RoundResolver implements Resolve<any> {
  constructor(private roundService: RoundService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Round> {
    return this.roundService.getOne(parseInt(route.paramMap.get('roundId'), 10)).pipe(take(1));
  }
}
