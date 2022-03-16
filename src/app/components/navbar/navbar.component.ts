import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private sessionService: SessionService, private router: Router) {
    console.log("test")
    console.log(this.token)
  }

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((token) => {
      this.token = token;
      this.name = this.sessionService.getName();
      console.log("reloaded navbar test")
    });
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
