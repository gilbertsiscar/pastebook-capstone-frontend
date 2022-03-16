import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  createPost(formData: any): Observable<any> {
    const fd = new FormData();

    if (formData.content) {
      fd.append('content', formData.content);
    }

    if (formData.image) {
      fd.append('image', formData.image);
    }
    return this.http.post<any>(`${this.baseUrl}`, fd, {
      headers: this.httpHeaders,
    });
  }

  // GET /api/posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`, {
      headers: this.httpHeaders,
    });
  }

  getPostsPagination(page: number, size: number = 10): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/pagination?page=${page}&size=${size}`,
      {
        headers: this.httpHeaders,
      }
    );
  }

  // GET /posts/{postId}
  getPostById(id: string): Observable<Post | null> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  // PUT /posts/{postId}
  updatePost(postId: string, formData: any): Observable<Post> {
    const fd = new FormData();

    if (formData.content) {
      fd.append('content', formData.content);
    }

    if (formData.image) {
      fd.append('image', formData.image);
    }

    return this.http.put<Post>(`${this.baseUrl}/posts/${postId}`, fd);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
