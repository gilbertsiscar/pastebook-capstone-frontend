import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from 'src/app/services/like.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  comments: Comment[];

  likes: number;
  liked: boolean = false;

  commentForm = this.fb.group({
    comment: ['', Validators.required],
  });

  constructor(
    private likeService: LikeService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.likeService.getLikes(this.post.id).subscribe((likes) => {
      this.likes = likes;
    });

    this.commentService.getComments(this.post.id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  onSubmit() {
    this.commentService
      .addComment(this.post.id, this.commentForm.value)
      .subscribe(() => {
        this.commentForm.reset();
        this.ngOnInit();
      });
  }

  like() {
    this.likeService.likePost(this.post.id).subscribe(() => {
      this.liked = true;
      this.ngOnInit();
    });
  }

  unlike() {
    this.likeService.unlikePost(this.post.id).subscribe(() => {
      this.liked = false;
      this.ngOnInit();
    });
  }
}
