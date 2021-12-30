import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { notyfFactory } from 'src/app/shared/guards/notyf.token';

import { BookingBuilderService } from '../app/services/booking-builder.service';

describe('BookingBuilderService', () => {
  let service: BookingBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, TranslateModule.forRoot() ],
      providers: [{ provide: Notyf, useFactory: notyfFactory, RouterTestingModule }],
  })
  .compileComponents();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})
});
