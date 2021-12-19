import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { LocalizationService } from '../app/services/localization.service';

describe('LocalizationService', () => {
  let service: LocalizationService;
  let translate: TranslateService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(LocalizationService);

  // });

  it('should be created', () => {
    service = new LocalizationService(translate)
    expect(service).toBeTruthy();
  });

  it('should have swedish and english', () => {
    service = new LocalizationService(translate)
    expect(service.languages).toEqual(['sv', 'en']);
  });

});
