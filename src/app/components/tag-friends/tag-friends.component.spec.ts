import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFriendsComponent } from './tag-friends.component';

describe('TagFriendsComponent', () => {
  let component: TagFriendsComponent;
  let fixture: ComponentFixture<TagFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
