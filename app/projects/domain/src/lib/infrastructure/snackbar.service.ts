import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  send(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
