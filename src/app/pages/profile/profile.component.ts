import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { FriendRequest } from 'src/app/models/friend-request';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // March 14 2 pm add-ons
  hasToken: boolean = (localStorage.getItem('token') !== null);
  receiverId: number = 0; // initiliazing
  senderId: number = parseInt(localStorage.getItem('idNumber')!);
  friendRequestList: User[] = [];
  isButtonStatus: boolean = true;

  // for button state
  oneFriendRequest: FriendRequest = new FriendRequest();
  oneFriend: Friend = new Friend();
  oneFriend2: Friend = new Friend();
  // March 14 2 pm add-ons

  user:User;
  profileUrl:string;
  constructor(
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute,
    private friendRequestService: FriendRequestService,
    private friendService: FriendService
  ) {
    // March 14 2 pm add-ons
    this.getProfileId();

    let profileUrlUser: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrlUser.replace(/\D/g, ""));

    userService.getOne(userId).subscribe((response: Object) => {
      this.user = response;
    })

    this.isOwner(); // this fires off upon loading the page (basically, put all the functions you want to be automatically called when you load the page)

    this.friendRequestService.getOneFriendRequest(this.senderId, userId).subscribe((response: FriendRequest) => {
      this.oneFriendRequest = response;})

    this.getOneFriendTwice()
    // March 14 2 pm add-ons


    // console.log("test")
    // this.user = {
    //   id: 1,
    //   firstName: "Alexis",
    //   lastName: "Sales",
    //   email: "test1@gmail.com",
    //   //password?: string, //should be omitted
    //   birthday: "10-9-1997",
    //   gender: "Male",
    //   mobileNumber: "09270753456",
    //   isOnline: true,
    //   datetimeCreated: "3-1-2022",
    //   profilePic: null,
    //   aboutMe: "Hello this is me!",
    //   profileUrl: "url for pic"
    // }
    // this.profileUrl = this.route.snapshot.params['profileUrl'];
    
   }

  ngOnInit(): void {
    // this.getUserDetails(this.profileUrl);
    //sconsole.log(this.user.email)
  }

  getUserDetails(profileUrl:string) :void{
    // this.userService.getUserProfile(profileUrl).subscribe((response: User) => {
    //   this.user = response;
    // })

    // this.userService.getUserProfile(profileUrl).subscribe({
    //   next: this.pageFound.bind(this),
    //   error: this.pageNotFound.bind(this)
    // });
  }

  pageFound(user: User){
    this.user = user;
  }

  pageNotFound(result: Record<string, any>){

    let data: Record<string, any> = result['error'];

    console.log(data);
    this.router.navigate(['/not-found']);

    // if (data['result'] === 'incorrect_credentials') {
    //   Swal.fire('Login Failed', 'You have entered incorrect credentials, please try again', 'error');
    // } else if (data['result'] === 'user_not_found') {
    //   Swal.fire('Login Failed', 'User does not exist, please try again.', 'error');
    // }

  }

  // March 14 2pm add-ons
  getOneFriendTwice() {

    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));

    this.friendService.getOneFriend(this.senderId, userId).subscribe((response: Friend) => {
      this.oneFriend = response;})

    this.friendService.getOneFriend(userId, this.senderId).subscribe((response: Friend) => {
      this.oneFriend2 = response;})
  }

   // this gets called when the 'Send Friend Request' button is clicked
  // this should be called in a button
  sendFriendRequest(): void {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));

    this.friendRequestService.sendFriendRequest(this.senderId, userId).subscribe({});

    // need to add code here that changes the status of the button
  }

  isOwner(): boolean {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));
    if (this.senderId == userId) {
      return true;
    } else {
      return false;
    }
  }

  // returns the id of the current page you're visiting
  getProfileId(): number {
    let profileUrl: string = this.route.snapshot.params['profileUrl'];
    let userId: number = parseInt(profileUrl.replace(/\D/g, ""));
    return userId;
  }

  // returns the profileUrl of the current page you're visiting
  getProfileUrl(): string {
    return this.route.snapshot.params['profileUrl'];
  }

  // changing the name of the button upon clicking
  changeName() {
    this.isButtonStatus = false;
  }

  // March 14 2pm add-ons

}
