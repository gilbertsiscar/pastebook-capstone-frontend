import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { FriendRequest } from 'src/app/models/friend-request';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() userId!: number;
  @Input() userFirstName!: string;
  @Input() userLastName!: string;
  @Input() userProfileUrl!: string;

  // March 14 2 pm add-ons
  hasToken: boolean = (localStorage.getItem('token') !== null);
  receiverId: number = 0; // initiliazing
  senderId: number = parseInt(localStorage.getItem('idNumber')!); // id of currently logged-in user
  friendRequestList: User[] = [];
  isButtonStatus: boolean = true;

  // for button state
  oneFriendRequest: FriendRequest = new FriendRequest();
  oneFriend: Friend = new Friend();
  oneFriend2: Friend = new Friend();
  // March 14 2 pm add-ons

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private friendRequestService: FriendRequestService,
    private friendService: FriendService
  ) { }

  ngOnInit(): void {
    // March 14 2 pm add-ons
    // this.getProfileId();

    // this.isOwner(); // this fires off upon loading the page (basically, put all the functions you want to be automatically called when you load the page)

    this.allFriendsFunctions() // para sabay-sabay na lahat ng functions (di nadidisplay needed values kapag may nauuna)
    // March 14 2 pm add-ons
  }

  // March 14 2pm add-ons
  getOneFriendTwice() {

    this.friendService.getOneFriend(this.senderId, this.userId).subscribe((response: Friend) => {
      this.oneFriend = response;})

    this.friendService.getOneFriend(this.userId, this.senderId).subscribe((response: Friend) => {
      this.oneFriend2 = response;})
  }

   // this gets called when the 'Send Friend Request' button is clicked
  // this should be called in a button
  sendFriendRequest(): void {
    
    this.friendRequestService.sendFriendRequest(this.senderId, this.userId).subscribe({});

    // need to add code here that changes the status of the button
  }

  // i-rerefactor i think??
  isOwner(): boolean {
    
    if (this.senderId == this.userId) {
      return true;
    } else {
      return false;
    }
  }

  // // returns the id of the current page you're visiting
  // getProfileId(): number {
  //   let profileUrl: string = this.route.snapshot.params['profileUrl'];
  //   let userId: number = parseInt(profileUrl.replace(/\D/g, ""));
  //   return userId;
  // }

  // changing the name of the button upon clicking
  changeName() {
    this.isButtonStatus = false;
  }

  allFriendsFunctions() {

    this.friendRequestService.getOneFriendRequest(this.senderId, this.userId).subscribe((response: FriendRequest) => {
      this.oneFriendRequest = response;})

    this.getOneFriendTwice()
    
  }

  // March 14 2pm add-ons

}
