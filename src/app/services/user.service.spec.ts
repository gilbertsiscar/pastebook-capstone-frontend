import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl: string = environment.apiUrl + '/users';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer' ${this.sessionService.getToken()}`
  })

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(email: string, password: string) {
    const debug = true;
    if (debug) return of({ email, password });
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  updatePersonalInfo(user: User): Observable<Object> {
    return this.http.put(this.baseUrl + `/details/${user.id}`, user, {headers: this.httpHeaders});
  }

}
