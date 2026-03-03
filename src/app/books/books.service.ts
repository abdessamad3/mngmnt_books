import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import {} from 'rxjs';
import { catchError, throwIfEmpty } from 'rxjs/operators';
import { book } from './books.model';
import { pagination } from '../shared/pagination/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksSubject = new BehaviorSubject<book[]>([]);
  books$ = this.booksSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  endpoint: string = 'books';
  constructor(private appService: AppService) {}

  getBooks(page, limit): Observable<{ data: book[]; pagination: pagination }> {
    return this.appService.getData(this.endpoint, page, limit).pipe(
      catchError((err) => {
        console.error('HTTP error', err);
        return throwError('Failed to fetch books. Please try again later.');
      }),
    );
  }

  searchBooks(
    page: number,
    limit: number,
    term?: string,
    sortBy?: string,
    sortOrder?: string,
  ): Observable<{ data: book[]; pagination: pagination }> {
    return this.appService
      .searchBooks(this.endpoint, term, page, limit, sortBy, sortOrder)
      .pipe(
        catchError((err) => {
          console.error('HTTP error', err);
          return throwError('Failed to fetch books. Please try again later.');
        }),
      );
  }
  postData(payload: book): Observable<book[]> {
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
