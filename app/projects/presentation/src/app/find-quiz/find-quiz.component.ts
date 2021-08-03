import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-quiz',
  templateUrl: './find-quiz.component.html',
  styleUrls: ['./find-quiz.component.sass'],
})
export class FindQuizComponent {
  shortId = new FormControl('', Validators.required);

  constructor(private router: Router) {}

  start() {
    if (this.shortId.valid) {
      this.router.navigate([this.shortId.value]);
    }
  }
}
