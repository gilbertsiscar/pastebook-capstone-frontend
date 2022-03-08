import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  submitted: boolean = false;

  registerForm = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.email],
    password: [null, Validators.required],
    birthday: [null, Validators.required],
    gender: [null],
    mobileNumber: [null],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      return this.successfulRegister({ data: 'test' });
    }
  }

  successfulRegister(response: Record<string, any>) {
    Swal.fire(
      'Account Created',
      'Your account has been created successfully, please login to continue',
      'success'
    );
    this.router.navigate(['']);
  }

  failedRegister(result: Record<string, any>) {
    const data = result['error'];

    if (data.result === 'user_exists') {
      Swal.fire(
        'Registration Failed',
        'Email or mobile number already exists',
        'error'
      );
    }
  }

  mobileNumberValidation(): string {
    if (this.submitted && (this.email?.value || this.mobileNumber?.value)) {
      return 'is-valid';
    } else if (this.submitted && !this.email?.value) {
      return 'is-invalid';
    } else if (this.submitted && this.mobileNumber) {
      return 'is-valid';
    }

    return '';
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
