import { MessageService } from './../shared/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { map } from 'rxjs/operators';
import { book } from './books.model';
import { DeliteBookDialogComponent } from '../delite-book-dialog/delite-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddbookModalComponent } from './addbook-modal/addbook-modal.component';
import { BooksService } from './books.service';
import { DeleteBookModalComponent } from './delete-book-modal/delete-book-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: book[] = [];
  isloading = false;
  error = null;

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;
  hasNext = false;
  hasPrevious = false;
  constructor(
    private BooksService: BooksService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  fetchdata(): void {
    this.isloading = true;
    console.log(
      '📡 Fetching page:',
      this.currentPage,
      'limit:',
      this.itemsPerPage,
    );
    this.BooksService.getBooks(this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        this.books = res.data;
        this.totalItems = res.pagination.totalItems;
        this.totalPages = res.pagination.totalPages;
        this.hasNext = res.pagination.hasNext;
        this.hasPrevious = res.pagination.hasPrevious;
        // this.currentPage = res.pagination.currentPage;
        this.isloading = false;
        this.error = null;
        console.log(this.books);
      },
      error: (err: any) => {
        this.isloading = false;
        // err may be Error or HttpErrorResponse
        this.messageService.error(err);
      },
    });
  }

  ngOnInit(): void {

    this.fetchdata();
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
              this.BooksService.postData(result.book).subscribe((resp) => {
                this.messageService.success('book added successfuly!');
                this.fetchdata();
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
              this.BooksService.editData(result.book.id, result.book).subscribe(
                (resp) => {
                  this.fetchdata();
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
          this.BooksService.deleteData(result.book.id).subscribe((res) => {
            this.fetchdata();
            this.messageService.success('book deleted successfuly');
          });
        }
      },
      (reason) => {
        console.log('Delete modal dismissed:', reason);
      },
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchdata();
  }

  onPerPageChange(perPage: number) {
    this.itemsPerPage = perPage;
    this.currentPage = 1; // Reset to first page
    this.fetchdata();
  }

  //--------------------------------------------------Mat part---------------------------------------------------------------------------------------------

  AddBookDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '60wv',
    });

    dialogRef.afterClosed().subscribe((result: book) => {
      if (result) {
        this.BooksService.postData(result)
          //if i understand : this is work if the data commes like this : key : { 'name':'value} but my response is {name : value} directly
          // .pipe(
          //   map(resp => {
          //     const respArray = [];
          //     for(const key in resp){
          //       if(resp.hasOwnProperty(key)){
          //         respArray.push({...resp[key], id : key})
          //       }
          //     }
          //     return respArray;
          //   }))
          .subscribe((resp) => {
            console.log(resp);
            this.fetchdata();
          });
      }
    });
  }

  onDeleteDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeliteBookDialogComponent, {
      width: '250px',
      data: {
        id: id,
        title: `delete ${name}`,
        message: `Are you sure you want to delete ${name} ?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.onDelete(id);
      }
    });
  }
  onDelete(id: number) {
    this.BooksService.deleteData(id).subscribe((res) => {
      this.fetchdata();
    });
  }

  onEditDialog(book: book): void {
    console.log(book);
    const dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '60wv',
      data: {
        data: book,
        title: `edit`,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.onEdit(data);
      }
    });
  }

  onEdit(book: book) {
    console.log(book);
    this.BooksService.editData(book.id, book).subscribe((res) => {
      this.fetchdata();
    });
  }
}
