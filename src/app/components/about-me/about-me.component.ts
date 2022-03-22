import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  addAboutMe: FormControl;
  characters: string;
  isFormVisible: boolean;
  id: string;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {
    
   }

  ngOnInit(): void {
    this.addAboutMe = new FormControl('', [Validators.maxLength(2000)])
    this.isFormVisible = false;
    this.id = this.sessionService.getUserId();
    this.characters = "";
  } 

  toggleIsFormVisible() {
    this.isFormVisible = !this.isFormVisible;
}

  onSubmit() {

    if (this.addAboutMe.valid) {

      this.userService
      .updateAboutMe(this.addAboutMe.value, this.id)
      .subscribe((response:any)=>{

        this.toggleIsFormVisible();
      },
      error=>{
        //ignore the errors lol
        this.ngOnInit();
      }); 

    }

  }
}