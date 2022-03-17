import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsOnlineStatusCardComponent } from './friends-online-status-card.component';

describe('FriendsOnlineStatusCardComponent', () => {
  let component: FriendsOnlineStatusCardComponent;
  let fixture: ComponentFixture<FriendsOnlineStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsOnlineStatusCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsOnlineStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
