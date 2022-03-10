import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  postForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: '',
    img: '',
  });

  @ViewChild('closeBtn') closeBtn!: ElementRef;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.postForm.valid) {
      this.isLoading = true;
      this.postService.createPost(this.postForm.value).subscribe({
        next: this.onSuccess.bind(this),
      });
    }
  }

  onSuccess() {
    this.isLoading = false;
    this.postForm.reset();
    this.closeBtn.nativeElement.click();
  }

  get title() {
    return this.postForm.get('title');
  }

  get body() {
    return this.postForm.get('body');
  }

  get img() {
    return this.postForm.get('img');
  }
}
