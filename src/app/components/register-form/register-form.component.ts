import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ApiError } from 'src/app/models/api-error';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  submitted = false;
  isLoading = false;

  registerForm = this.formBuilder.group({
    firstName: [null, [Validators.required, this.noWhitespaceValidator]],
    lastName: [null, [Validators.required, this.noWhitespaceValidator]],
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    birthday: [null, Validators.required],
    gender: 'Select Gender',
    mobileNumber: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.userService.register(this.registerForm.value).subscribe({
        next: this.successfulRegister.bind(this),
        error: this.failedRegister.bind(this),
      });
    }
  }

  successfulRegister(response: Record<string, any>) {
    this.isLoading = false;
    Swal.fire(
      'Account Created',
      'Your account has been created successfully, please login to continue',
      'success'
    );
    this.router.navigate(['/login']);
  }

  failedRegister(error: ApiError) {
    this.isLoading = false;
    if (error) {
      Swal.fire('Registration Failed', 'Email number already exists', 'error');
      this.email.setErrors({ emailExists: true });
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }
}
