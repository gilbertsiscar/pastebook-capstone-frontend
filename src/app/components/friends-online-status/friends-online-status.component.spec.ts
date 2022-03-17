import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsOnlineStatusComponent } from './friends-online-status.component';

describe('FriendsOnlineStatusComponent', () => {
  let component: FriendsOnlineStatusComponent;
  let fixture: ComponentFixture<FriendsOnlineStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsOnlineStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsOnlineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
