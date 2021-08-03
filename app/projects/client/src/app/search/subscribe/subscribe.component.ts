import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@client/login/user';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.sass'],
})
export class SubscribeComponent implements OnInit {
  email = new FormControl(null, [Validators.email]);
  team = new FormControl();
  remark = new FormControl();

  constructor(public dialogRef: MatDialogRef<SubscribeComponent>, @Inject(MAT_DIALOG_DATA) public data: { quiz: Quiz; user: User }) {}

  ngOnInit(): void {
    if (this.data.user) {
      this.email.setValue(this.data.user.email);
      this.team.setValue(this.data.user.team);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  confirm(): void {
    this.dialogRef.close({
      quiz: this.data.quiz,
      subscription: {
        quizId: this.data.quiz.quizId,
        email: this.email.value,
        team: this.team.value,
        remark: this.remark.value,
      },
    });
  }
}
