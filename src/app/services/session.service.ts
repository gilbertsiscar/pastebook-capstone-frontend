import { EventEmitter, Injectable, Output } from '@angular/core';

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

  clear() {
    localStorage.clear();
    this.hasToken.emit(false);
  }
}
