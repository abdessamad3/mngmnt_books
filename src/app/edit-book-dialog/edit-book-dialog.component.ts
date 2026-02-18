import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliteBookDialogComponent } from '../delite-book-dialog/delite-book-dialog.component';
import { book } from '../books/books.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css'],
})
export class EditBookDialogComponent implements OnInit
{
  clientForm: FormGroup;
  languages = [
    'french',
    'engilsh',
    'arabic',
   ];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeliteBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { data: book; title: string },
  ) {
    this.clientForm = this.fb.group({
          id: [data.data.id],
          Name: [data.data.name, Validators.required],
          isbm: [data.data.isbm, Validators.required],
          price: [data.data.price, Validators.required],
          publishedAt:[data.data.publishedAt,Validators.required],
          pages: [data.data.pages, Validators.required],
          language:[data.data.language, Validators.required]
        });
  }

  edit() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    console.log();
  }
}
