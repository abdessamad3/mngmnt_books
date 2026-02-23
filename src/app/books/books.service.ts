import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import {} from 'rxjs';
import { catchError, throwIfEmpty } from 'rxjs/operators';
import { book } from './books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  endpoint: string = 'books';
  constructor(private appService: AppService) {}

  getBooks(): Observable<book[]> {
    return this.appService.getData(this.endpoint).pipe(
      catchError((err) => {
        console.error('HTTP error', err);
        return throwError('Failed to fetch books. Please try again later.');
      }),
    );
  }
  postData( payload: book): Observable<book[]> {
    return this.appService.addData(this.endpoint, payload).pipe(
      catchError((err) => {
        console.log('HTTP error', err);
        return throwError('Failed to add books. Please try again later.');
      }),
    );
  }

  deleteData(id: number) {
    return this.appService.deleteData(this.endpoint, id).pipe(
      catchError((err) => {
        console.log('http error', err);
        return throwError('failed to delete book. Please try again later');
      }),
    );
  }

  editData(id: number, payload: book) {
    return this.appService.editData(this.endpoint, id, payload).pipe(
      catchError((err) => {
        console.log('http error', err);
        return throwError('failed to delete book. Please try again later');
      }),
    );
  }
}
