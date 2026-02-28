import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { book } from './books/books.model';
import { pagination } from './shared/pagination/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = environment.apiUrl;
  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzIyOTgxMTksImV4cCI6MTc3MjMwMTcxOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWJkZXNzYW1hZGppYnJhbmUyQGdtYWlsLmNvbSJ9.O1qhiVGonDhFtK4-HYrNzBTHrq1nsDO57uWFaut2A0Gv3uBAWapgy0a5rFHS5Stq7M5qxlVX046nU3DDa_dxnuD22RypXu2klHhU0P3AytAYwMy7indxMkEPY3sQgZdd5fbm7OEHbkRMuY_EKxr0JyQbLeyZqVpG8NAKIIUgjr7ku6opMzSOk0-5aSEbI8O4sB3EAvil0VYVfote_UhotWRkSx3iz84jAPAfHpVNEExSBVVVf0QmHomQI4B_2qWDQ_1ix7QVGuQ8CwNLrqN_MKHhCTEP-JIHubl3JgqablV_sxGbqHHXxi-oF6uo75JkeFJbj6_y5T0hxLAM-xeKjg'; // or a hardcoded token for testing

  //change the type expected from book to T
  constructor(private http: HttpClient) {}

  getData(
    endpoint: string,
    page,
    limit,
  ): Observable<{ data: book[]; pagination: pagination }> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;

    return this.http.get<{ data: book[]; pagination: pagination }>(
      `${this.apiUrl}/${endpoint}?page=${page}&limit=${limit}`,
      { headers },
    );
  }

  // Search with pagination (if backend supports it)
  //add types
  searchBooks(
    endpoint: string,
    term: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ data: book[]; pagination: pagination }> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;
    return this.http.get<{ data: book[]; pagination: pagination }>(
      `${this.apiUrl}/${endpoint}?search=${term}&page=${page}&limit=${limit}`,
      { headers },
    );
  }

  addData(endpoint: string, payload: book): Observable<book[]> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;
    return this.http.post<book[]>(`${this.apiUrl}/${endpoint}`, payload, {
      headers,
    });
  }
  deleteData(endpoint: string, id: number) {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`, { headers });
  }
  editData(endpoint: string, id: number, payload: book) {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;
    return this.http.put(`${this.apiUrl}/${endpoint}/${id}`, payload, {
      headers,
    });
  }
}
