import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  let service: LocalizationService;
  let translate: TranslateService
  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(LocalizationService);

  // });

  it('should be created', () => {
    service = new LocalizationService(translate)
    expect(service).toBeTruthy();
  });
});
