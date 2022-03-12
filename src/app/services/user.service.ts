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
    Authorization: `Bearer' ${this.sessionService.getToken()}`,
  });

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  register(user: User) {
    if (!environment.production) return of(user).pipe(delay(3000));

    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  updatePersonalInfo(user: User): Observable<Object> {
    return this.http.put(this.baseUrl + `/details/${user.id}`, user, {headers: this.httpHeaders});
  }
}
