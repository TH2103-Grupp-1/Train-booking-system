import { TestBed } from '@angular/core/testing';

import { BookingBuilderService } from '../app/services/booking-builder.service';

describe('BookingBuilderService', () => {
  let service: BookingBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
