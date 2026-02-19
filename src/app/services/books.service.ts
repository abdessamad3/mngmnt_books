import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { book } from '../books/books.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = environment.apiUrl;
  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzE1MDYxMjksImV4cCI6MTc3MTUwOTcyOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWJkZXNzYW1hZGppYnJhbmUyQGdtYWlsLmNvbSJ9.VeHl4X4jy-860FHj-lHw5OqqI0kfDp1IHpi97Pn6lkWPVmsDXEGR4_OMJT13CmY72VVeZJDkGRPAe-NI4EdyY0h2aePN0C_OABvfO4SQ9BJXWiTBfmeT7yV3rNjQ8-EdY7XZ5JoM1rzjDvxK7_922pQ3d3L0rv5gYOHYVpeQpas80AIKmHYfFu89yW_zov7Slfby1FDyQR_z2Z_ES6gb6IlrZde6iV3H0Xc-ViFKTDmOVXGNmFhQPO2XKUiX-mA5TTQ-bBdcjFrstzkONEzHnt5EWLFpITXXq5CqEWx0pHIZ2qgKAtb8A0Q7YSeV-c4gidsZYyk6pveY1A_Loz5A0Q'; // or a hardcoded token for testing

  constructor(private http: HttpClient) {}

  getBooks(endpoint: string): Observable<book[]> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;

    return this.http.get<book[]>(`${this.apiUrl}/${endpoint}`, { headers }).pipe(
      catchError((err) => {
        console.error('HTTP error', err);
        return throwError('Failed to fetch books. Please try again later.');
      })
    );;
  }

  postData(endpoint: string, payload: book): Observable<book[]> {
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
    return this.http.put(`${this.apiUrl}/${endpoint}/${id}`,  payload, { headers });
  }

}
