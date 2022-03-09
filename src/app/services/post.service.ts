import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  createPost() {}
}
