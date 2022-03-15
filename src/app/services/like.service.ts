import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private baseUrl = `${environment.apiUrl}/like`;
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.sessionService.getToken(),
  });

  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) {}

  // POST /api/like/{postId}
  likePost(postId: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${postId}`,
      {},
      { headers: this.httpHeaders }
    );
  }

  unlikePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${postId}`, {
      headers: this.httpHeaders,
    });
  }

  // GET /api/like/{postId}
  getLikes(postId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${postId}`, {
      headers: this.httpHeaders,
    });
  }
}
