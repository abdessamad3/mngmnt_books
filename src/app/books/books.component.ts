import { MatDialog } from '@angular/material/dialog';
import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { map } from 'rxjs/operators';
import { book } from './books.model';
import { DeliteBookDialogComponent } from '../delite-book-dialog/delite-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: book[] = [];
  isloading = false;
  error = null;
  constructor(
    private BooksService: BooksService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.fetchdata(); 
  }
  AddBookDialog() {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '60wv',
    });

    dialogRef.afterClosed().subscribe((result: book) => {
      if (result) {
        this.BooksService.postData('books', result)
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
    this.BooksService.deleteData('books', id).subscribe((res) => {
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
    this.BooksService.editData('books', book.id, book).subscribe((res) => {
      this.fetchdata();
    });
  }

  fetchdata(): void {
    this.isloading = true;
    this.BooksService.getBooks('books').subscribe({
      next: (res) => {
        this.books = res;
        this.isloading = false;
        this.error = null;
      },
      error: (err: any) => {
        this.isloading = false;
        // err may be Error or HttpErrorResponse
        this.error = err || 'Unknown error occurred';
      }
    });
  }
}
