import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) {}

  login(credentials: Login) {
    return this.http.post(this.baseUrl, credentials);
  }
}
