import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Post } from '../models/post';

import { PostService } from './post.service';

describe('ValueService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(PostService);
  });

  it(
    'should return created post',
    waitForAsync(() => {
      const post = new Post();
      post.title = 'test';
      post.body = 'test';
      service.createPost(post).subscribe({
        next(response) {
          expect(response).toBeDefined();
          console.log('Post created: ', response);
        },
        error: console.error,
      });
    })
  );

  it(
    'should return all post',
    waitForAsync(() => {
      service.getPosts().subscribe({
        next(response) {
          expect(response).toBeDefined();
          console.log('Get all posts: ', response);
        },
        error(err) {},
      });
    })
  );

  it(
    'should return specific post',
    waitForAsync(() => {
      service.getPostById('1').subscribe({
        next(response) {
          expect(response).toBeDefined();
          console.log('Get spectific post: ', response);
        },
        error(err) {},
      });
    })
  );

  it(
    'should return updated post',
    waitForAsync(() => {
      const post = new Post();
      post.title = 'edit';

      service.updatePost(post).subscribe({
        next(response) {
          expect(response).toEqual(post);
          console.log('Edited post: ', response);
        },
        error(err) {},
      });
    })
  );

  it(
    'should delete a post',
    waitForAsync(() => {
      service.deletePost('1').subscribe({
        next(response) {
          expect(response).toBeDefined();
          console.log(response);
        },
        error(err) {},
      });
    })
  );
});
