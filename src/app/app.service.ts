import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzI1NzczNzAsImV4cCI6MTc3MjU4MDk3MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWJkZXNzYW1hZGppYnJhbmUyQGdtYWlsLmNvbSJ9.Qg3v-wagx_bzJnyJ6rb0Qzw4XucCU3_cRcjY_pwrAo01sc1zkLIuKY0hzDOK7fIgw--t4fheLogk440Rtgd8ceRmlL8LbbeftML1O0N6pp1YDAO_VPCoNBhfTHYGGIBDBs37xPySFhfsbru1Jiaz6l_mlWjYuhz7Cx2L_zKUZCb1NoQsPZeJHVwzjIVn18bHw6oYVvxiy4iwYxbYaLVkBcd3CnSLO_L53gxTAS3rT8ZElCImh2VissHeAJor4M2uuVvBpve6gwwN56FKDw4CZujgj6S3eVeT3CFRfy-JzgO28KiSxbVBZnYouAPzGsJNtNlhjRz-R7snhVhlMbdM6A'; // or a hardcoded token for testing

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
    sortBy?: string,
    sortOrder?: string,
  ): Observable<{ data: book[]; pagination: pagination }> {
    const headers = this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;

      // ✅ PROPER WAY: Use HttpParams
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (term) {
      params = params.set('search', term);
    }

    // ✅ ADD SORT PARAMETERS
    if (sortBy) {
      params = params.set('sortBy', sortBy);
      params = params.set('sortOrder', sortOrder || 'asc');
    }

    // Debug log
    console.log('🌐 API Request:', {
      url: `${this.apiUrl}/${endpoint}`,
      params: params.toString()
    });

    return this.http.get<{ data: book[]; pagination: pagination }>(
      `${this.apiUrl}/${endpoint}`,
      { headers, params },
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
