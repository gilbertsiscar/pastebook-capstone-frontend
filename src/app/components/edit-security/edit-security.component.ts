import { Component } from '@angular/core';
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
  isLoading: boolean = false;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.securityForm = this.formBuilder.group({
      email: ['', Validators.required],
      mobileNumber: '',
      password: ['', Validators.required],
    });

    this.id = this.sessionService.getUserId();

    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserById(this.id).subscribe((response) => {
      this.securityForm.patchValue({
        email: response['email'],
        password: response['password'],
        mobileNumber: response['mobileNumber'],
      });
    });
  }

  onSubmit() {
    this.isLoading = true;
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
    this.isLoading = false;
    this.sessionService.setEmail(response['email']);
    this.sessionService.setToken(response['token']);
    this.sessionService.setName(response['name']);
    this.sessionService.setUserId(response['id']);
    this.sessionService.setIdNumber(response['idNumber']);
    this.sessionService.setProfileUrl(response['profileUrl']);
    this.getUserDetails();
  }

  onFail(response: any) {
    this.isLoading = false;
    console.log(response);
  }

  closeBtn() {
    this.success = false;
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
