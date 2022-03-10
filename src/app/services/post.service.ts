import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/posts`;
  private readonly _debug = true;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  createPost({ title, body }: Post): Observable<object> {
    const userId = this.sessionService.getUserId() || '';
    const post = new Post(title, body, userId);

    if (this._debug) return of({ fakeResponse: true }).pipe(delay(3000));

    return this.http.post(`${this.baseUrl}/posts/${userId}/1`, post);
  }
}
