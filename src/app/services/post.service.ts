import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
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

  // GET /posts
  getPosts(): Observable<Post[]> {
    const fakeData = [
      {
        id: '1',
        title: 'post1',
      },
      {
        id: '2',
        title: 'post2',
      },
    ];
    if (this._debug)
      return of(fakeData)
        .pipe(delay(3000))
        .pipe(
          map((data) =>
            data.map(({ title }) => new Post().deserialize({ title }))
          )
        );

    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  // GET /posts/{userId}
  getPostById(id: string): Observable<Post | null> {
    if (this._debug)
      return of({ title: 'specificPost' })
        .pipe(delay(3000))
        .pipe(map(({ title }) => new Post().deserialize({ title })));

    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  // PUT /posts/{postId}
  updatePost(post: Post): Observable<Post> {
    if (this._debug) return of(post).pipe(delay(3000));

    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }

  deletePost(id: string): Observable<Post> {
    if (this._debug) return of({} as Post).pipe(delay(3000));

    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }
}
