import { TestBed } from '@angular/core/testing';

describe('ZoneTrackingService', () => {
  let service: NgxZoneTrackingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxZoneTrackingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
