import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  profileUrl:string;
  constructor(
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log("test")
    this.user = {
      id: 1,
      firstName: "Alexis",
      lastName: "Sales",
      email: "test1@gmail.com",
      //password?: string, //should be omitted
      birthday: "10-9-1997",
      gender: "Male",
      mobileNumber: "09270753456",
      isOnline: true,
      datetimeCreated: "3-1-2022",
      profilePic: null,
      aboutMe: "Hello this is me!",
      profileUrl: "url for pic"
    }
    this.profileUrl = this.route.snapshot.params['profileUrl'];
    
   }


   
  ngOnInit(): void {
    this.getUserDetails(this.profileUrl);
    //sconsole.log(this.user.email)
  }

  getUserDetails(profileUrl:string) :void{
    // this.userService.getUserProfile(profileUrl).subscribe((response: User) => {
    //   this.user = response;
    // })

    this.userService.getUserProfile(profileUrl).subscribe({
      next: this.pageFound.bind(this),
      error: this.pageNotFound.bind(this)
    });
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

}
