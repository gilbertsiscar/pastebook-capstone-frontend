import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class TriggerNotificationsService {

  id: string;
  ws: WebSocketSubject<any>;
  //name: string;
  //message: string;
  //message$: Observable<Message>;
  connected: boolean;
   
  


  constructor() { 
     this.connect();
     this.id = localStorage.getItem("user_id");
  }

  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    
    this.ws = webSocket('ws://localhost:8080/onlineconnection'); // returns a WebSocketSubject
    
    this.ws.subscribe(
      // Called whenever there is a message from the server.
      msg => console.log(msg),
      // Called if at any point WebSocket API signals some kind of error.
      err => console.log(err),  
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    )

    // this.setConnected(true);
  }
  imOnline(id:string):void{
    this.ws.next({user_id:this.id});
  }
   
  respond(){
    //this.messages.push(value);
    console.log("Message from server")
  }

 
  // disconnect(err?) {
  //   if (err) { console.error(err); }
  //   this.setConnected(false);
  //   console.log('Disconnected');
  // }

  // triggerNotif(ws:WebSocketSubject<any>){
  //   ws.next({user_id:this.id,trigger:"Post Notification"});
  //   //this.ws.complete();
  // }
  onlineConnection() {
    this.ws.next({user_id:localStorage.getItem('user_id')});
  }

  // setConnected(connected) {
  //   this.connected = connected;
  // }
}
