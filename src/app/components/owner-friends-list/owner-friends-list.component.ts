import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { FriendRequest } from 'src/app/models/friend-request';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-owner-friends-list',
  templateUrl: './owner-friends-list.component.html',
  styleUrls: ['./owner-friends-list.component.css']
})
export class OwnerFriendsListComponent implements OnInit {
// March 14 2pm add-ons
friendList: User[] = [];
isButtonVisible: boolean = true;
hasToken: boolean = (localStorage.getItem('token') !== null);
profileOwnerId: number = parseInt(localStorage.getItem('idNumber')!);
// March 14 2pm add-ons

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private friendRequestService: FriendRequestService,
    private friendService: FriendService
  ) {

    friendService.getFriends(this.profileOwnerId).subscribe((response: User[]) => {
      this.friendList = response;})
   }

  ngOnInit(): void {
  }

  // delete friend
  deleteFriend(userId: number): void {
    
    this.friendService.deleteFriend(userId, this.profileOwnerId).subscribe(() => {});
    // who is the requester here and who is the recipient (need ko ito i explain ww)

  }

   // removing a card
   removeUserFromUserList(card: User) {
    let index = this.friendList.indexOf(card);
    this.friendList.splice(index, 1);
  }
}
