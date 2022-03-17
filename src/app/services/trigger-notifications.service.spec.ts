import { TestBed } from '@angular/core/testing';

import { TriggerNotificationsService } from './trigger-notifications.service';

describe('TriggerNotificationsService', () => {
  let service: TriggerNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriggerNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
