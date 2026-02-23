import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {

   clientForm: FormGroup;
   languages = [
    'french',
    'engilsh',
    'arabic',
   ];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBookDialogComponent>
  ) {
    this.clientForm = this.fb.group({
      Name: ['', Validators.required],
      isbm: ['', Validators.required],
      price: [null, Validators.required],
      publishedAt:['',Validators.required],
      pages: [null, Validators.required],
      language:['', Validators.required]
    });
  }

  save() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value); // return form data to caller
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
