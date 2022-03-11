import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    if (!environment.production)
      return of({ token: 'randomToken' }).pipe(delay(3000));

    return this.http.post(this.baseUrl, { email, password });
  }
}
