import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
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
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    birthday: [null, Validators.required],
    gender: null,
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
      let user = new User();
      user = { ...this.registerForm.value };
      this.userService.register(user).subscribe({
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
