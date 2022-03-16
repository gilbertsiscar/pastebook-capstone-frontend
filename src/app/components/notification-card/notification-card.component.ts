import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/notificationModel';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {

  @Input() notification!: NotificationModel;
  constructor() { }

  ngOnInit(): void {
    this.notification = {
        // public id?: number,
        // public user?: string,
        // public action?: string,
        // public post_id?: string,
        // public isRead?: boolean,
        // public datetimeCreated?: Date
        "id": 1,
        "user":"Someone",
        "action":"liked your post",
        "post_id":"1",
        "isRead": false,
        "datetimeCreated": new Date("10-10-2022")
    }
  }

}
