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
    });

    this.id = this.sessionService.getUserId();
    this.userService.getUserById(this.id).subscribe((user: User) => {
      const { firstName, lastName, birthday } = user;
      this.editForm.setValue({ firstName, lastName, birthday });
    });
  }

  onSubmit(): void {
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
    const { firstName, lastName, birthday } = updatedUser;
    this.sessionService.setName(`${firstName} ${lastName}`);
    this.editForm.setValue({ firstName, lastName, birthday });
  }

  closeBtn() {
    this.success = false;
  }
}
