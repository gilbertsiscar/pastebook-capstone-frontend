import { Component, Input, OnInit } from '@angular/core';
import { friendStatus } from 'src/app/models/friend';

@Component({
  selector: 'app-friends-online-status-card',
  templateUrl: './friends-online-status-card.component.html',
  styleUrls: ['./friends-online-status-card.component.css']
})
export class FriendsOnlineStatusCardComponent implements OnInit {

  @Input() friend!: friendStatus;
  constructor() { }

  ngOnInit(): void {

    
  }

}
