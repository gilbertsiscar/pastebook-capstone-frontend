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

  // POST /posts/{userId}/{receiverId}
  createPost(post: Post): Observable<Post> {
    const userId = this.sessionService.getUserId() || '';
    post.userId = userId;

    if (this._debug) return of(post).pipe(delay(3000));

    return this.http.post<Post>(`${this.baseUrl}/posts/${userId}/1`, post);
  }

  getPosts(): Observable<Post[]> {
    if (this._debug) return of([]).pipe(delay(3000));

    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPostById(id: string): Observable<Post | null> {
    if (this._debug) return of(null).pipe(delay(3000));

    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  updatePost(post: Post): Observable<Post> {
    if (this._debug) return of(post).pipe(delay(3000));

    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }

  deletePost(id: string): Observable<Post> {
    if (this._debug) return of({} as Post).pipe(delay(3000));

    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }
}
