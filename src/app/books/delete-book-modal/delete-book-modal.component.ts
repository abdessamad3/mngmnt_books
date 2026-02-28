import { Component, Input, OnInit } from '@angular/core';
import { book } from '../books.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-book-modal',
  templateUrl: './delete-book-modal.component.html',
  styleUrls: ['./delete-book-modal.component.css']
})
export class DeleteBookModalComponent implements OnInit {

@Input() bookData: book;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.activeModal.close({
      confirmed: true,
      book: this.bookData
    });
  }

  dismiss() {
    this.activeModal.dismiss('Cancel');
  }

}
