import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.get().pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url,
          },
        });
        return false;
      }),
    );
  }
}
