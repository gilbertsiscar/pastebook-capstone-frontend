import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  //not sure kung tama paglagay ng path based sa backend
  private baseUrl: string = environment.apiUrl + '/users/details';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer' ${this.sessionService.getToken()}`
  })

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const debug = true;
    if (debug) return of({ email, password });
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}`);
  }

  updatePersonalInfo(user: User): Observable<Object> {
    return this.http.put(this.baseUrl + `/${user.id}`, user, {headers: this.httpHeaders});
  }

  

}
