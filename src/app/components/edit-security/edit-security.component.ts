import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-security',
  templateUrl: './edit-security.component.html',
  styleUrls: ['./edit-security.component.css']
})
export class EditSecurityComponent implements OnInit {

  form: FormGroup;
  submitted = false;



  ngOnInit(): void {

  }
  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router

  ) {
    this.form = formBuilder.group({
      email: ['', Validators],
      mobile: ['', Validators],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
      // need to make validator na kailangan ng current password to edit email/mobile/password
    })
  }

  MustMatch(newPassword: string, confirmPassword: string): any { 
    if (newPassword == confirmPassword) { 
      return "Passwords match";
      // should appear as alert

    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    
    this.submitted = true;

    this.securityService.resetPassword(this.form.value.email, this.form.value.mobile, this.form.value.newPassword).subscribe((response: Record<string, any>) => {

      if (response['result'] === 'updated') {

        Swal.fire({
          title: 'Update successful',
          text: 'Your security information has been updated successfully',
          icon: 'success'

        }).then(() => {
          this.router.navigate(['/settings']);
        })

      }
    })
  }

}










