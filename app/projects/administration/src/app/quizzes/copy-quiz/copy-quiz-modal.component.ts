import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-copy-quiz-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './copy-quiz-modal.component.html',
  styleUrls: ['./copy-quiz-modal.component.sass'],
})
export class CopyQuizModalComponent {
  form = this.fb.group({
    rounds: new FormArray([]),
  });

  constructor(public dialogRef: MatDialogRef<CopyQuizModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Quiz, private fb: FormBuilder) {
    if (data.rounds) {
      data.rounds.forEach(() => (this.form.controls.rounds as FormArray).push(new FormControl(true)));
    } else {
      this.dialogRef.close({ copy: false, roundIds: [] });
    }
  }

  annuleren(): void {
    this.dialogRef.close({ copy: false, roundIds: null });
  }
  kopieren(): void {
    const roundIds = [];
    this.data.rounds.forEach((q, index) => {
      if (this.form.controls.rounds.value[index]) {
        roundIds.push(q.roundId);
      }
    });
    this.dialogRef.close({ copy: true, roundIds });
  }
}
