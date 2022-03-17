import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFriendsListComponent } from './owner-friends-list.component';

describe('OwnerFriendsListComponent', () => {
  let component: OwnerFriendsListComponent;
  let fixture: ComponentFixture<OwnerFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
