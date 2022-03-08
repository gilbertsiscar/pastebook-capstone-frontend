import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    birthday: [null, Validators.required],
    gender: [null, Validators.required],
    mobileNumber: [null, Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {}

  successfulLogin(response: Record<string, any>) {
    Swal.fire(
      'Login Successful',
      'You have successfully logged in.',
      'success'
    );
    this.router.navigate(['']);
  }

  failedLogin(result: Record<string, any>) {
    const data = result['error'];

    if (data.result === 'incorrect_credentials') {
      Swal.fire(
        'Login Failed',
        'You have entered incorrect credentials, please try again',
        'error'
      );
    } else if (data.result === 'user_not_found') {
      Swal.fire(
        'Login Failed',
        'User does not exist, please try again.',
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
}
