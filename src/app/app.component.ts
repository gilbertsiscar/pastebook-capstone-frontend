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

  // temporary fix
  token: boolean = localStorage.getItem('token') !== null;
  id: string;
  ws: WebSocketSubject<any>;
  name: string;
  message: string;
  message$: Observable<Message>;
  connected: boolean;
  
  constructor(private sessionService: SessionService, private router: Router) {
    //console.log("test")
    //console.log(this.token)
    
    //Disable for now, lots of bugs
    this.connect();
  }
  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    
    this.ws = webSocket('ws://localhost:8080/onlineconnection'); // returns a WebSocketSubject
    //  split the subject into 2 observables, depending on object.type
    this.message$ = this.ws.multiplex(
      () => ({subscribe: 'message'}),
      () => ({unsubscribe: 'message'}),
      message => message.type === 'message'
    );

    // this.messageNumber$ = this.ws.multiplex(
    //   () => ({ subscribe: 'messageNumber' }),
    //   () => ({ unsubscribe: 'messageNumber' }),
    //   message => message.type === 'messageNumber'
    // );

    // subscribe to messages sent from the server
    this.message$.subscribe(
      value => (
        this.update(value)
        ),
      error => this.disconnect(error),
      () => this.disconnect()
    );

    // get the number of the messages from the server
    // this.messageNumber$.subscribe(
    //   value => this.numberOfMessages = value.messagecount,
    //   error => this.disconnect(error),
    //   () => this.disconnect()
    // );

    this.setConnected(true);
  }
   
  update(value){
    //this.messages.push(value);
    console.log("force Update")
  }
  disconnect(err?) {
    if (err) { console.error(err); }
    this.setConnected(false);
    console.log('Disconnected');
  }

  sendMessage() {
    this.ws.next({ name: this.name, message: this.message, type: 'message' });
    this.message = '';
  }

  setConnected(connected) {
    this.connected = connected;
    //this.messages = [];
  }

  ngOnInit(): void {
    this.sessionService.hasToken.subscribe((hasToken) => {
      this.token = hasToken;
    });
  }
}
