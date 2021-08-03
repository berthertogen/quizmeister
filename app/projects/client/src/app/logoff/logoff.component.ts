import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-logoff',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class LogoffComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.clear();
    this.router.navigate(['/']);
  }
}
