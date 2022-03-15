import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
// March 14 2pm changes
@Input() id!: number
friendRequestList: User[] = [];
senderId: number = parseInt(localStorage.getItem('idNumber')!);
isButtonVisible: boolean = true;
// March 14 2pm changes



  friendRequests: Record<string, string>[] = [
    { 
      // add profile pic
      'firstName': 'Ana Marie',
      'lastName': 'Santos',
      'aboutMe': 'yeyeyeyeyeyyeeye'
    },
    {
      'firstName': 'Magmilagro',
      'lastName': 'Sana',
      'aboutMe': 'Bohhhxzzz mapagmahal'
    },
    {
      'firstName': 'Mirasol',
      'lastName': 'Cruz',
      'aboutMe': 'Kaantok naman to'
    },
    {
      'firstName': 'Mary Jane',
      'lastName': 'Cruz',
      'aboutMe': 'yaw ko na iyaq'
    },
    {
      'firstName': 'Heart',
      'lastName': 'Evangelista',
      'aboutMe': 'yes fighting lang kasi'
    },
    {
      'firstName': 'Birch',
      'lastName': 'Tree',
      'aboutMe': 'ginagawa mu XD'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private friendRequestService: FriendRequestService,
    private friendService: FriendService
  ) {
    let currentUserId: number = parseInt(localStorage.getItem('id')!);

      let profileUrl: string = this.route.snapshot.params['profileUrl'];
      let userId: number = parseInt(profileUrl.replace(/\D/g, ""));

      friendRequestService.getFriendRequests(this.senderId).subscribe((response: User[]) => {
        this.friendRequestList = response;})
   }

  ngOnInit(): void {
  }

  acceptFriend(userId: number): void {
    // let profileUrl: string = this.route.snapshot.params['profileUrl'];
    // let userId: number = parseInt(profileUrl.replace(/\D/g, ""));

    this.friendService.acceptFriend(userId, this.senderId).subscribe(() => {});
    // who is the requester here and who is the recipient (need ko ito i explain ww)

  }

  cancelFriendRequest(userId: number): void {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let pageId: number = parseInt(profileUrl.replace(/\D/g, ""));

    // ( mali, correct)
    this.friendRequestService.cancelFriendRequest(userId, pageId).subscribe(() => {});

  }

  // removing a card
  removeUserFromUserList(card: User) {
    let index = this.friendRequestList.indexOf(card);
    this.friendRequestList.splice(index, 1);
  }

}
