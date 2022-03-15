import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  allUsers: User[] = [];
  hasToken: boolean = (localStorage.getItem('token') !== null);

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.getUsers();

    sessionService.hasToken.subscribe(hasToken => {
      this.hasToken = hasToken;
    })
   }

  ngOnInit(): void {
  }

  getUsers() {
    this.userService.get().subscribe((response: User[]) => {this.allUsers = response;})
  }
}
