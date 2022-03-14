import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { LikeService } from 'src/app/services/like.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  constructor(private likeService: LikeService) {}

  ngOnInit(): void {}

  like() {
    this.likeService.likePost(this.post.id).subscribe(console.log);
  }
}
