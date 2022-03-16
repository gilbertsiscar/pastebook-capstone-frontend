import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: ['./edit-security.component.css'],
})
export class EditSecurityComponent {
  securityForm: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.securityForm = this.formBuilder.group({
      email: '',
      mobileNumber: '',
      password: '',
    });

    this.id = this.sessionService.getUserId();

    this.userService.getUserById(this.id).subscribe((response) => {
      const { email, mobileNumber } = response;
      const password = '';
      this.securityForm.setValue({ email, mobileNumber, password });
    });
  }

  onSubmit() {
    if (this.securityForm.valid) {
      this.userService
        .updateSecurityInfo(this.id, this.securityForm.value)
        .subscribe({
          next: this.onSuccess.bind(this),
          error: this.onFail.bind(this),
        });
    }
  }

  onSuccess(response: any) {
    console.log(response);
    this.sessionService.setEmail(response['email']);
    this.sessionService.setToken(response['token']);
    this.sessionService.setName(response['name']);
    this.sessionService.setUserId(response['id']);
    this.sessionService.setIdNumber(response['idNumber']);
    this.sessionService.setProfileUrl(response['profileUrl']);
    this.ngOnInit();
  }

  onFail(response: any) {
    console.log(response);
  }
}

// MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];

//     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//       // return if another validator has already found an error on the matchingControl
//       return;
//     }

//     // set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mustMatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   };
// }
