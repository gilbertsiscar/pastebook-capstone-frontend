import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/comment`;
  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.sessionService.getToken(),
  });

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  getComments(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }

  addComment(postId: string, comment: Comment): Observable<any> {
    console.log(comment);
    return this.http.post(`${this.baseUrl}/${postId}`, comment, {
      headers: this.httpHeaders,
    });
  }
}
