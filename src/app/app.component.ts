import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pastebook-capstone-frontend';

  // temporary fix
  token: boolean = localStorage.getItem('token') !== null;

  constructor(private sessionService: SessionService, private router: Router) {
    //console.log("test")
    //console.log(this.token)
  }

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;
    });
  }
}
