import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { book } from './books/books.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
private apiUrl = environment.apiUrl;
  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzE4NDYwMjYsImV4cCI6MTc3MTg0OTYyNiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWJkZXNzYW1hZGppYnJhbmUyQGdtYWlsLmNvbSJ9.uN3UbEtgpASh2YyTLZWF42HxDdBbx9s9C9cvtRc1F3G3A6Wx4ZXKCZPKpfNxgBnRLsKomINn6RBRNq8EA5epHx9OB1StZwaW4YZ6CYvo3giElSXHcxHaLHaa7a6nlC2zlXbj_XPKF4xtbLFegeHo6YGwAc6RXES7K3tMAO97IuAfUe7Mc1qC209yQV9laXchGZHn0kdtboEqnad4udm41ZN07kuE-WasaHwZCX4x1oejCEf6GSA5_FZZZd198mWg9RYDaquOwFdYoccpfOj6QIN19F9180_U5NoYgCejsOJORzE-HSUTPnAcCqlUKT-Gxs6yjm40JePbXOmTgtJRjg'; // or a hardcoded token for testing

    //change the type expected from book to T
  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<book[]> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;

    return this.http.get<book[]>(`${this.apiUrl}/${endpoint}`, { headers });
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
    return this.http.put(`${this.apiUrl}/${endpoint}/${id}`,  payload, { headers });
  }

}
