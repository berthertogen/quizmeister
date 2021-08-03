import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  email = new FormControl(null, [Validators.email]);
  team = new FormControl(null);
  rememberme = new FormControl(false);
  return: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => (this.return = params.return || '/forums'));
  }

  public continue(): void {
    this.userService.set(
      {
        default: false,
        email: this.email.value,
        team: this.team.value,
      },
      this.rememberme.value,
    );
    this.router.navigateByUrl(this.return);
  }
}
