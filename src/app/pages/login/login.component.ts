import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/app/models/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  method = 'email';
  loginForm: LoginForm[];

  constructor() {}

  ngOnInit(): void {
    if (this.method === 'email') {
      this.loginForm = this.emailMethod();
    }

    if (this.method === 'mobilenumber') {
      this.loginForm = this.mobileMethod();
    }
  }

  onMethodChange(method: string) {
    this.method = method;
    this.ngOnInit();
  }

  emailMethod() {
    const email: LoginForm = {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email',
    };

    const password: LoginForm = {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
    };

    return [email, password];
  }

  mobileMethod() {
    const mobile: LoginForm = {
      id: 'mobile',
      name: 'mobile',
      type: 'text',
      label: 'Mobile Number',
    };

    return [mobile];
  }
}
