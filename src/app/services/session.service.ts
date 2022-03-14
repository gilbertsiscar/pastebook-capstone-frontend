import { EventEmitter, Injectable, Output } from '@angular/core';
import { UserService } from './user.service';

/**
 * Todo:
 * [] Manage multiple local user/tokens
 */

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  @Output() hasToken: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    if (localStorage.getItem('token') !== null) {
      this.hasToken.emit(true);
    } else {
      this.hasToken.emit(false);
    }
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  getEmail(): string {
    return localStorage.getItem('email')!;
  }

  getName(): string {
    return localStorage.getItem('name')!;
  }

  setToken(token: string) {
    this.hasToken.emit(true);
    localStorage.setItem('token', token);
  }

  setUserId(id: string) {
    localStorage.setItem('user_id', id);
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
  }


  setName(name: string) {
    localStorage.setItem('name', name);
  }

  clear() {
    localStorage.clear();
    this.hasToken.emit(false);
  }
}
