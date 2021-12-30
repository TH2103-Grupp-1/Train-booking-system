import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { notyfFactory } from 'src/app/shared/guards/notyf.token';

import { SeatService } from '../app/services/seat.service';

describe('SeatService', () => {
  let service: SeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, TranslateModule.forRoot(),  RouterTestingModule],
      providers: [{ provide: Notyf, useFactory: notyfFactory , }],
  })
  .compileComponents();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})
});
