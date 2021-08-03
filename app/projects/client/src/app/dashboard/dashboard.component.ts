import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { query, QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../login/user';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  user$: Observable<QueryOutput<User>>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = query('user', () => this.userService.get()).pipe(tap((user) => console.log(user)));
  }

  logOff(): void {
    this.userService.clear();
    this.router.navigateByUrl('/dashboard');
  }
}
