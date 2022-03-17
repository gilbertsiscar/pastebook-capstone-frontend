import { Component, OnInit } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  searchText: string = "";
  users: User[] = [];

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {
    // this.getSearchedUsers();
   }

  ngOnInit(): void {
  }

  getSearchedUsers() {
    this.userService.getUsers(this.searchText).subscribe((response: User[]) => {
      this.users = response;
    })
  }

  getFilteredUsers() {
    this.userService.getUsers(this.searchText).subscribe((response: User[]) => {
      this.users = response;
    })
  }
  
}
