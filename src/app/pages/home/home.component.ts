import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      if (posts) {
        this.posts = posts.sort(
          (a, b) =>
            <any>new Date(b.datetimeCreated) - <any>new Date(a.datetimeCreated)
        );
      }
    });
  }

  onRefresh() {
    this.ngOnInit();
  }
}
