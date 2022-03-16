import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/models/notificationModel';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = localStorage.getItem('name');
  token: boolean = localStorage.getItem('token') !== null;

  // Code for searching users
  searchTerm: string = "";
  searchTerm2: string = "mikuuu";
  // Code for searching users

  // March 14 2 pm add-ons
  ownerUrl = localStorage.getItem('profileUrl');
  // March 14 2 pm add-ons


  notifications: NotificationModel[] = [];
  notification: NotificationModel;
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((token) => {
      this.token = token;
      this.name = this.sessionService.getName();
      console.log("reloaded navbar test")
    });

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
    this.notifications.push(this.notification);
    this.notifications.push(this.notification);
  }

  logout() {
    this.sessionService.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }

  // routing to search component
  routeToSearchComponent() {
    this.router.navigate(['/search']);
  }
}
