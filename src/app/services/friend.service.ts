import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl: string = environment.apiUrl + '/friends';

  constructor(private http: HttpClient) { }

  acceptFriend(requesterId: number, recipientId: number): Observable<Object> {
    return this.http.post(this.baseUrl, {requesterId, recipientId}, {responseType: 'text'});
  }

  deleteFriend(requesterId: number, recipientId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + `/${requesterId}/${recipientId}`);
  }

  getFriends(pageId: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `/${pageId}`);
  }

  getOneFriend(requesterId: number, recipientId: number): Observable<Object> {
    return this.http.get<Friend>(this.baseUrl + `/${requesterId}/${recipientId}`);
  }
  
}
