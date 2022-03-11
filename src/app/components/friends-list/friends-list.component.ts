import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends: Record<string, string>[] = [
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
