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

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;
    });
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }
}
