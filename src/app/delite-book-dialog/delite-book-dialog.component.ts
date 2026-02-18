import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delite-book-dialog',
  templateUrl: './delite-book-dialog.component.html',
  styleUrls: ['./delite-book-dialog.component.css'],
})
export class DeliteBookDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeliteBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; title: string; message: string },
  ) {}

  ngOnInit(): void {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
