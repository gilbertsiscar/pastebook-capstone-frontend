import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.sessionService.getToken()}`,
  });

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUser(id: number): Observable<User> {
    //console.log(this.sessionService.getToken());
    console.log(this.http);
    return this.http.get<User>(`${this.baseUrl}/details/${id}`, {
      headers: this.httpHeaders,
    });
  }
  // temp
  getUserProfile(profileUrl: string): Observable<User> {
    //console.log(this.sessionService.getToken());
    console.log(this.http);
    return this.http.get<User>(`${this.baseUrl}/profile/${profileUrl}`, {
      headers: this.httpHeaders,
    });
  }

  updatePersonalInfo(user: User): Observable<Object> {
    //Fix later
    return this.http.put(`${this.baseUrl}/details/${user.id}`, user, {
      headers: this.httpHeaders,
    });
  }

  // testConnectionToDatabawe(): Observable<Object>{
  //   rreturn this.http.get<User>(`${this.baseUrl}/details/${id}`);
  // }

  updateSecurityInfo(
    id: number,
    email: string,
    mobileNumber: string,
    password: string
  ): Observable<Object> {
    return this.http.put(
      this.baseUrl + `/details/${id}`,
      { email, mobileNumber, password },
      { headers: this.httpHeaders }
    );
  }
}
