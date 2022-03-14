import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: ['./edit-security.component.css']
})
export class EditSecurityComponent implements OnInit {

  updateSecurityForm: FormGroup;
  id: number;
  user: User = new User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) {
      // This is used to grab the id from the url/path
      let userId: number = this.route.snapshot.params['id'];

      userService.getUser(userId).subscribe((response: Object) => {
        this.user = response})
  }

  ngOnInit(): void {

    this.updateSecurityForm = this.formBuilder.group({
      'newEmail': new FormControl('', [Validators.email]),
      'mobileNumber': new FormControl(),
      'newPassword': new FormControl('', [Validators.minLength(8)]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'currentPassword': new FormControl('', [Validators.required])
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    })

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  // add checker if current password is the same as the registered password

  onSubmit() {

    this.userService.updateSecurityInfo(this.id, this.updateSecurityForm.value.newEmail, this.updateSecurityForm.value.mobileNumber, this.updateSecurityForm.value.newPassword).subscribe((response: Record<string, any>) => {

      if (response['result'] === 'updated') {

        Swal.fire({
          title: 'Update successful',
          text: 'Your security information has been updated successfully',
          icon: 'success'

        }).then(() => {
          this.router.navigate(['/settings']);
        })

      }
    })

    }
  }











function userId(userId: any, newEmail: any, mobileNumber: any, newPassword: any) {
  throw new Error('Function not implemented.');
}

