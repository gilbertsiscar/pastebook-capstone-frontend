import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: ['./edit-security.component.css'],
})
export class EditSecurityComponent {
  emailChangeForm: FormGroup;
  passwordChangeForm: FormGroup;

  id: string;
  isLoading: boolean = false;
  submitted: boolean = false;
  success: boolean = false;

  isEmailEdit: boolean = false;
  isPasswordEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.emailChangeForm = this.formBuilder.group({
      currentEmail: ['', [Validators.required, Validators.email]],
      newEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });

    this.id = this.sessionService.getUserId();
    this.fetchCurrentEmail();
  }

  fetchCurrentEmail() {
    this.userService.getUserById(this.id).subscribe((res) => {
      this.emailChangeForm.get('currentEmail').patchValue(res['email']);
    });
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

  get newEmail() {
    return this.emailChangeForm.get('newEmail');
  }

  get password() {
    return this.emailChangeForm.get('password');
  }

  onEmailSubmit() {
    this.submitted = true;
    
    if (this.emailChangeForm.valid) {
      this.isLoading = true;
      this.userService
        .updateSecurityEmail(this.id, this.emailChangeForm.value)
        .subscribe({
          next: this.onEmailSuccess.bind(this),
          error: this.onEmailFail.bind(this),
        });
    }
  }

  onEmailSuccess(response: any) {
    this.success = true;
    this.isLoading = false;
    this.sessionService.setId(response['id']);
    this.sessionService.setEmail(response['email']);
    this.sessionService.setToken(response['token']);

  }

  onEmailFail(response: any) {
    this.isLoading = false;
    
  }

  // Changing Password

  get currentPassword() {
    return this.passwordChangeForm.get('currentPassword');
  }

  get newPassword() {
    return this.passwordChangeForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword');
  }

  onPasswordSubmit() {
    this.submitted = true;
    
    if (this.passwordChangeForm.valid) {
      this.isLoading = true;
      this.userService
        .updateSecurityPassword(this.id, this.passwordChangeForm.value)
        .subscribe({
          next: this.onPasswordSuccess.bind(this),
          error: this.onPasswordFail.bind(this),
        });
    }
  }

  onPasswordSuccess(response: any) {
    this.isLoading = false;
    this.success = true;
  }

  onPasswordFail(response: any) {
    this.isLoading = false;
    this.success = false;
  }

  closeBtn() {
    this.success = false;
  }

  toggleEmail() {
    this.isEmailEdit = !this.isEmailEdit;
  }

  togglePassword() {
    this.isPasswordEdit = !this.isPasswordEdit;
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const newPassword = control.get('newPassword').value;
    const currentPassword = control.get('confirmPassword').value;
    return newPassword === currentPassword ? null : { mismatch: true };
  }
}
