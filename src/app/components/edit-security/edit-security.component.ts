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

  email: string = '';
  mobileNumber: string = '';

  ngOnInit(): void {

  }
  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router

  ) {
    this.form = formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    })
  }

  MustMatch(newPassword: string, confirmPassword: string): void { }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    
    this.submitted = true;

    this.securityService.resetPassword('', this.form.value.newPassword, this.form.value.confirmPassword,).subscribe((response: Record<string, any>) => {

      if (response['result'] === 'updated') {

        Swal.fire({
          title: 'Update successful',
          text: 'Your security ingormation has been updated successfully',
          icon: 'success'

        }).then(() => {
          this.router.navigate(['/settings']);
        })
      }
    })
  }

}










