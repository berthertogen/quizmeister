import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Round } from '@domain/round/round';

@Component({
  selector: 'app-delete-round-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-round-modal.component.html',
  styleUrls: ['./delete-round-modal.component.sass'],
})
export class DeleteRoundModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteRoundModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Round) {
    if (!data.questions || data.questions.length <= 0) {
      this.dialogRef.close({ delete: true, deleteQuestions: false });
    }
  }

  cancel(): void {
    this.dialogRef.close({ delete: false, deleteQuestions: null });
  }
  no(): void {
    this.dialogRef.close({ delete: true, deleteRounds: false });
  }
  yes(): void {
    this.dialogRef.close({ delete: true, deleteRounds: true });
  }
}
