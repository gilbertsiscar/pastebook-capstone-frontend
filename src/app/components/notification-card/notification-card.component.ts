import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/notificationModel';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {

  @Input() notification!: NotificationModel;
  constructor() {
      
    
  }

  ngOnInit(): void {
   
  }

}
