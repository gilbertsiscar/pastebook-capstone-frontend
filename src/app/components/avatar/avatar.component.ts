import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() imgUrl: SafeResourceUrl;
  @Input() width: number = 48;
  @Input() height: number = 48;

  constructor() {}

  ngOnInit(): void {}
}
