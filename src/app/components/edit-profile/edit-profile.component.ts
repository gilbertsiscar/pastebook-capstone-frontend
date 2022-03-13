import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      let userId: number = this.route.snapshot.params['id'];

      userService.getUser(userId).subscribe((response: Object) => {
        this.user = response
      })
     }

  ngOnInit(): void {
  }

  onSubmit(updateProfileForm: NgForm): void {
    this.userService.updatePersonalInfo(this.user).subscribe((response: Record<string, any>) => {

      if (response['result'] === 'updated') {

        Swal.fire({
          title: 'Update successful',
          text: 'Your personal information has been updated successfully',
          icon: 'success'

        }).then(() => {
          this.router.navigate(['/settings']);
          updateProfileForm.reset();
          
        })
      }
    })  
  }
}
