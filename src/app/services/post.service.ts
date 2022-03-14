import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.sessionService.getToken(),
  });

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  // POST /api/posts
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}`, post, {
      headers: this.httpHeaders,
    });
  }

  // GET /api/posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`, {
      headers: this.httpHeaders,
    });
  }

  // GET /posts/{postId}
  getPostById(id: string): Observable<Post | null> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  // PUT /posts/{postId}
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }
}
