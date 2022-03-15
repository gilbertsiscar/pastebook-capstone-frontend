import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() imgUrl?: string;
  @Input() width: number = 48;
  @Input() height: number = 48;

  constructor() {}

  ngOnInit(): void {}
}
