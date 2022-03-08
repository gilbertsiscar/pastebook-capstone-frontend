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

  registerForm = this.formBuilder.group(
    {
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.email],
      password: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null],
      mobileNumber: [null],
    },
    { validators: emailAndMobileNumberValidator }
  );

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.successfulRegister({ data: 'test' });
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

function emailAndMobileNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.get('email');
  const mobileNumber = control.get('mobileNumber');

  return email?.value && mobileNumber?.value
    ? { emailAndMobileNumber: true }
    : null;
}
