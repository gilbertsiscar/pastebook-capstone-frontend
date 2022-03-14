import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

/**
 * Todo:
 * [] Add Clear Selection
 */
@Component({
  selector: 'app-tag-friends',
  templateUrl: './tag-friends.component.html',
  styleUrls: ['./tag-friends.component.css'],
})
export class TagFriendsComponent implements OnInit, DoCheck {
  form: FormArray;
  data: Friends[] = [];

  @Input() reset: number = 0;
  @Output() taggedFriends = new EventEmitter<Friends[]>();

  @ViewChild('reset') resetBtn: ElementRef;

  constructor(private fb: FormBuilder) {
    this.form = fb.array([]);
  }

  ngOnInit() {
    this.data = [
      { name: 'Gilbert' },
      { name: 'Nessa' },
      { name: 'Angelo' },
      { name: 'Kyle' },
    ];
  }

  ngDoCheck(): void {
    this.form.valueChanges.subscribe((data) => {
      this.taggedFriends.emit(data);
    });
  }

  get friends() {
    return this.form.controls['friends'] as FormArray;
  }

  tagFriend(event: any) {
    if (event.target.checked) {
      this.form.push(this.fb.control(event.target.value));
    } else {
      this.form.value.forEach((item: Friends, index: number) => {
        if (item === event.target.value) {
          this.form.removeAt(index);
        }
      });
    }
  }
}

export interface Friends {
  name: string;
}
