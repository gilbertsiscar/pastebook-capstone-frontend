import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  birthday: string = "";
  gender: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
