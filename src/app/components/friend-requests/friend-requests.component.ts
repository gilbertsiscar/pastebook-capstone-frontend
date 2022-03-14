import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
