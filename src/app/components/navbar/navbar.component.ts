import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token: boolean = localStorage.getItem('token') !== null;

  // March 14 2 pm add-ons
  ownerUrl = localStorage.getItem('profileUrl');
  // March 14 2 pm add-ons

  constructor(private sessionService: SessionService, private router: Router) {
    console.log("test")
    console.log(this.token)
  }

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;

      console.log(this.token)
    });
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }
}
