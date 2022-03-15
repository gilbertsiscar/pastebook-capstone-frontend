import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { FriendRequest } from '../models/friend-request';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private baseUrl: string = environment.apiUrl + '/friendRequests';

  constructor(private http: HttpClient) { }

  sendFriendRequest(senderId: number, receiverId: number): Observable<Object> {
    return this.http.post(this.baseUrl, {senderId, receiverId}, {responseType: 'text'});
  }

  getFriendRequests(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `/${id}`);
  }

  cancelFriendRequest(senderId: number, receiverId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + `/${senderId}/${receiverId}`);
  }

  getOneFriendRequest(senderId: number, receiverId: number): Observable<Object> {
    return this.http.get<FriendRequest>(this.baseUrl + `/${senderId}/${receiverId}`);
  }
  
}
