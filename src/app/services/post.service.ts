import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/posts`;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  createPost({ title, body }: Post) {
    const userId = this.sessionService.getUserId() || '';
    const post = new Post(title, body, userId);
    this.http.post(`${this.baseUrl}/posts/${userId}/1`, post).subscribe();
  }
}
