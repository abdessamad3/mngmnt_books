import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { book } from '../books.model';

@Component({
  selector: 'app-addbook-modal',
  templateUrl: './addbook-modal.component.html',
  styleUrls: ['./addbook-modal.component.css']
})
export class AddbookModalComponent implements OnInit {

   @Input() mode: 'add' | 'edit' = 'add';

  @Input() bookData: book = {
    name: '',
    isbm: '',
    price: 0,
    publishedAt: '',
    pages: 0,
    language: ''
    };
    languages = ['arabic','frensh','english']

  constructor(public activeModal: NgbActiveModal) { }

  get isAddMode(): boolean {
    return this.mode === 'add';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get modalTitle(): string {
    return this.isAddMode ? 'Add New Book' : 'Edit Book';
  }

   get submitButtonText(): string {
    return this.isAddMode ? 'Save Book' : 'Update Book';
  }

  ngOnInit(): void {
    if (this.bookData.publishedAt) {
      this.bookData.publishedAt = this.formatDateForInput(this.bookData.publishedAt);
    }
    console.log(this.bookData)
  }

  formatDateForInput(date: any): string {
    if (!date) return '';

    // If it's a Date object
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }

    // If it's a string (like "2024-03-15T00:00:00.000Z")
    if (typeof date === 'string') {
      // Try to parse and format
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
      }
    }

    return date; // Return as is if it's already YYYY-MM-DD
  }

  save() {
    // Pass the book data back to the parent component
    if (this.bookData.id) {
    console.log('🔵 EDIT MODE - Updating book ID:', this.bookData.id);
    this.activeModal.close({
      action: 'edit',
      book: this.bookData
    });
  } else {
    console.log('🟢 ADD MODE - Creating new book');
    this.activeModal.close({
      action: 'add',
      book: this.bookData
    });
  }
  }

  dismiss() {
    this.activeModal.dismiss('Cancel');
  }

}
