import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { book } from '../books/books.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = environment.apiUrl;
  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzE0MTczNDMsImV4cCI6MTc3MTQyMDk0Mywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWJkZXNzYW1hZGppYnJhbmUyQGdtYWlsLmNvbSJ9.agVyGlt9HPpnR_Y4JBDDPA1U8dl76S76m5y-slZGwOzyk9Yo04JEl7H5RzpnTi1sAzzhZTjujIHVPERFJ6BAie7BtaAeRdXTXpCoudNtNePyi_geRc_55ZYU-lKNp79k7BAVJ5P8ezmEnJi1nthhFrcGXfY7-03sqALRVbmEcCTUCtuSKWyOsiriH4q2ZMN0zI-vnyaAQ7uYZbX6I-4NGbsHtK-i92hP9d2T9h5lqDKS7i4UaPM6t09dlxi1SEroOj8Hz_UANhT9OqL-KI3UufDfEB2G_cY-nZBRLeggD9Bx9BWzn2dxcoO-2UC7reQklndEO23OmC3GEPNT6llMSg'; // or a hardcoded token for testing

  constructor(private http: HttpClient) {}

  getBooks(endpoint: string): Observable<book[]> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;

    return this.http.get<book[]>(`${this.apiUrl}/${endpoint}`, { headers });
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
