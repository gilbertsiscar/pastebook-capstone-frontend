import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;

  submitted = false;
  success = false;
  isLoading = false;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: '',
      mobileNumber: '',
    });

    this.id = this.sessionService.getUserId();

    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserById(this.id).subscribe((user: User) => {
      this.editForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        gender: user.gender,
        mobileNumber: user.mobileNumber,
      });
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.isLoading = true;
      this.userService
        .updatePersonalInfo(this.id, this.editForm.value)
        .subscribe({
          next: this.onSuccess.bind(this),
        });
    }
  }

  onSuccess(updatedUser: User): void {
    this.success = true;
    this.isLoading = false;
    this.sessionService.setName(
      `${updatedUser.firstName} ${updatedUser.lastName}`
    );
    this.getUserDetails();
  }

  closeBtn() {
    this.success = false;
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get birthday() {
    return this.editForm.get('birthday');
  }
}
