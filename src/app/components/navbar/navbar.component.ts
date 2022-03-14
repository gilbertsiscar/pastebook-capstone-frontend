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

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;
      console.log("reloaded navbar test")
      console.log(this.token)
=======
    this.sessionService.hasToken.subscribe((token) => {
      this.token = token;
      this.name = this.sessionService.getName();
>>>>>>> 519aa0d2e670e24b0128c5c8511f01c3a0a1aee2
    });
  }

  logout() {
    this.sessionService.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }
}
