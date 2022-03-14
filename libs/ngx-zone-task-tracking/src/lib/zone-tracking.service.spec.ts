import { TestBed } from '@angular/core/testing';

describe('ZoneTaskTrackingService', () => {
  let service: NgxZoneTaskTrackingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxZoneTaskTrackingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
