import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators'

interface Message {
  name: string; message: string; type: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pastebook-capstone-frontend';

   token: boolean = localStorage.getItem('token') !== null;

  
  constructor(private sessionService: SessionService, private router: Router) {
    //console.log("test")
    //console.log(this.token)
    
    //Disable for now, lots of bugs
    //this.connect();
  }
 

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;
    });
  }
}
