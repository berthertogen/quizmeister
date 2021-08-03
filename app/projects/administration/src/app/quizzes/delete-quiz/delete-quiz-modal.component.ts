import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz } from '@domain/quiz/quiz';

@Component({
  selector: 'app-delete-quiz-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-quiz-modal.component.html',
  styleUrls: ['./delete-quiz-modal.component.sass'],
})
export class DeleteQuizModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteQuizModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Quiz) {
    if (!data.rounds || data.rounds.length <= 0) {
      this.dialogRef.close({ delete: true, deleteRounds: false });
    }
  }

  cancel(): void {
    this.dialogRef.close({ delete: false, deleteRounds: null });
  }
  no(): void {
    this.dialogRef.close({ delete: true, deleteRounds: false });
  }
  yes(): void {
    this.dialogRef.close({ delete: true, deleteRounds: true });
  }
}
