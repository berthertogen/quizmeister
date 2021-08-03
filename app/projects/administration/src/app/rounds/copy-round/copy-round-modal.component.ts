import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Round } from '@domain/round/round';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-copy-round-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './copy-round-modal.component.html',
  styleUrls: ['./copy-round-modal.component.sass'],
})
export class CopyRoundModalComponent {
  form = this.fb.group({
    questions: new FormArray([]),
  });

  constructor(
    public dialogRef: MatDialogRef<CopyRoundModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Round,
    private fb: FormBuilder,
  ) {
    if (data.questions) {
      data.questions.forEach(() => (this.form.controls.questions as FormArray).push(new FormControl(true)));
    } else {
      this.dialogRef.close({ copy: false, roundIds: [] });
    }
  }

  annuleren(): void {
    this.dialogRef.close({ copy: false, roundIds: null });
  }
  kopieren(): void {
    const questionIds = [];
    this.data.questions.forEach((q, index) => {
      if (this.form.controls.questions.value[index]) {
        questionIds.push(q.questionId);
      }
    });
    this.dialogRef.close({ copy: true, questionIds });
  }
}
