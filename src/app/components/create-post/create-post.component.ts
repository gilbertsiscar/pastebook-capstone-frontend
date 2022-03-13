import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { Friends } from '../tag-friends/tag-friends.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, DoCheck {
  name: string;
  displayTagged: Friends[] = [];
  displayTaggedLength = 0;
  imagePreview = '';
  isLoading: boolean;

  postForm: FormGroup = this.fb.group({
    content: '',
    image: '',
    tagged: '',
  });

  @ViewChild('imageInput') imageInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.name = this.sessionService.getEmail();
  }

  ngDoCheck(): void {
    this.postForm.valueChanges.subscribe((data) => {
      this.displayTagged = data['tagged'];
      if (this.displayTagged) {
        this.displayTaggedLength = this.displayTagged.length;
      }
    });
  }

  onSubmit() {
    this.displayTaggedLength = 0;
    this.removeImage();
    this.postForm.reset();
  }

  getTaggedFriends(friends: Friends[]) {
    this.tagged.setValue(friends);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.image.patchValue(file);
    this.image.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addImage() {
    this.imageInput.nativeElement.click();
  }

  removeImage() {
    this.imagePreview = '';
    this.image.setValue('');
  }

  get tagged() {
    return this.postForm.get('tagged');
  }

  get image() {
    return this.postForm.get('image');
  }
}
