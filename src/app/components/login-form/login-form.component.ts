import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

import Swal from 'sweetalert2';

/**
 * Todo:
 * [] Implement remember me functionality
 * [] Implement forgot password functionality
 * [x] Implement a more robust input validation
 * [] Refactor login handling
 */

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  submitted = false;
  isLoading = false;

  loginForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: this.successfulLogin.bind(this),
        error: this.failedLogin.bind(this),
      });
    }
  }

  successfulLogin(response: Record<string, any>) {
    this.isLoading = false;
    Swal.fire(
      'Login Successful',
      'You have successfully logged in.',
      'success'
    );
    this.sessionService.setEmail(response['email']);
    this.sessionService.setToken(response['token']);
    this.sessionService.setUserId(response['user_id']);
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
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
