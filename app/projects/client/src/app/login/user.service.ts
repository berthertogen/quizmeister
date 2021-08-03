import { Injectable } from '@angular/core';
import { User, UserDefault } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: BehaviorSubject<User>;

  readonly userKey: string = 'Quizmeister.User';

  constructor() {
    let input = JSON.parse(localStorage.getItem(this.userKey));
    if (input) {
      this.user = new BehaviorSubject<User>(input);
      return;
    }
    input = JSON.parse(sessionStorage.getItem(this.userKey));
    if (input) {
      this.user = new BehaviorSubject<User>(input);
      return;
    }
    this.user = new BehaviorSubject<User>(new UserDefault());
  }

  get(): Observable<User> {
    return this.user;
  }

  set(user: User, permanent: boolean): void {
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userKey);
    if (permanent) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
    this.user.next(user);
  }

  clear(): void {
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userKey);
    this.user.next(new UserDefault());
  }
}
