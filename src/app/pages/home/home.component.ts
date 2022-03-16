import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  postSubscription: Subscription;
  posts: Post[] = [];

  totalPages: number;
  currentPage: number = 0;

  observer: IntersectionObserver;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((data) => {
      if (data.last) {
        this.observer.observe(data.last.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages && this.posts.length === 10) {
          this.currentPage++;
          this.adpendPost();
        }
      }
    }, options);
  }

  adpendPost() {
    this.postService
      .getPostsPagination(this.currentPage)
      .subscribe((res) =>
        res.content.forEach((post: Post) => this.posts.push(post))
      );
  }

  getPosts() {
    this.postSubscription = this.postService
      .getPostsPagination(this.currentPage)
      .subscribe((res) => {
        this.totalPages = res.totalPages;
        this.posts = res.content;
        // res.content.forEach((post: Post) => this.posts.push(post));
        console.log(this.posts);
      });
  }

  onDelete(id: string, index: number) {
    console.log(index);
    this.posts.splice(index, 1);
    this.postService.deletePost(id).subscribe(() => {
      this.getPosts();
    });
  }

  onRefresh() {
    this.getPosts();
  }
}
