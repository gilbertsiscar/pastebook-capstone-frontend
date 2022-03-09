import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const debug = true;
    if (debug) return of({ email, password });
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    birthday,
    gender,
  }: User) {
    return this.http.post(`${this.baseUrl}/register`, {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      birthday,
      gender,
    });
  }
}
