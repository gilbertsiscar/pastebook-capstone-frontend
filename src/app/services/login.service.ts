import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<Login | any> {
    return this.http
      .post<Login>(this.baseUrl, credentials)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return error.error;
  }
}
