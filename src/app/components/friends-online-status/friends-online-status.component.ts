import { Component, OnInit } from '@angular/core';
import { friendStatus } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friends-online-status',
  templateUrl: './friends-online-status.component.html',
  styleUrls: ['./friends-online-status.component.css']
})
export class FriendsOnlineStatusComponent implements OnInit {

  friendsList:friendStatus[]=[];
 
  userId = localStorage.getItem('user_id');
  constructor( private friendService: FriendService) { 
    
  }

  ngOnInit(): void {
    this.getFriendStatus();
  }

  getFriendStatus(){
    this.friendService.getFriendStatus(this.userId).subscribe((response: any) => {
      //console.log("respondinglol")
      this.friendsList = response;
    })
  }
}
