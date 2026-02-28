import { BooksComponent } from './../books.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { book } from '../books.model';
import { BooksService } from '../books.service';
import { MessageService } from 'src/app/shared/message/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddbookModalComponent } from '../addbook-modal/addbook-modal.component';
import { DeleteBookModalComponent } from '../delete-book-modal/delete-book-modal.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  books$ = this.booksService.books$; // 👈 Just observe, don't fetch!
  isloading$ = this.booksService.loading$;
    error = null;

  constructor(
    private booksService: BooksService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private booksComponent : BooksComponent

  ) { }

  ngOnInit(): void {
    this.loadData()
    console.log(this.booksComponent.books);


  }

  loadData (){

  }

  openAddModal(): void {
      try {
        const modalRef = this.modalService.open(AddbookModalComponent);
        modalRef.componentInstance.mode = 'add';
        modalRef.componentInstance.bookData = {
          name: '',
          isbm: '',
          price: null,
          publishedAt: '',
          pages: null,
          language: 'arabic',
        };
        modalRef.result.then(
          (result: { action: string; book: book }) => {
            if (result.action === 'add') {
              console.log('result.data: ' + result.book, 'result: ', result);
              try {
                this.booksService.postData(result.book).subscribe((resp) => {
                  this.messageService.success('book added successfuly!');
                  this.booksComponent.fetchdata();
                });
              } catch (error) {
                console.log('error adding:', error);
                this.messageService.error(`❌ Error: ${error.message}`);
              }
            }
          },
          (reason) => {
            console.log('Modal dismissed:', reason);
          },
        );
      } catch (error) {
        this.messageService.error(`❌ Error Modal: ${error.message}`);
      }
    }

    openEditModal(bookData: book): void {
      try {
        const modalRef = this.modalService.open(AddbookModalComponent);
        modalRef.componentInstance.mode = 'edit';
        modalRef.componentInstance.bookData = { ...bookData };
        modalRef.result.then(
          (result: { action: string; book: book }) => {
            if (result.action === 'edit') {
              try {
                this.booksService.editData(result.book.id, result.book).subscribe(
                  (resp) => {
                    this.booksComponent.fetchdata();
                    this.messageService.success('book updated successfuly!');
                  },
                );
              } catch (error) {
                console.log('error adding:', error);
                this.messageService.error(`❌ Error: ${error.message}`);
              }
            }
          },
          (reason) => {},
        );
      } catch (error) {
        console.error('Error opening modal:', error);
      }
    }

    openDeleteModal(book: book) {
      const modalRef = this.modalService.open(DeleteBookModalComponent, {
        size: 'md',
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });

      modalRef.componentInstance.bookData = book;
      modalRef.result.then(
        (result) => {
          if (result && result.confirmed) {
            this.booksService.deleteData(result.book.id).subscribe((res) => {
              this.booksComponent.fetchdata();
              this.messageService.success('book deleted successfuly');
            });
          }
        },
        (reason) => {
          console.log('Delete modal dismissed:', reason);
        },
      );
    }

}
