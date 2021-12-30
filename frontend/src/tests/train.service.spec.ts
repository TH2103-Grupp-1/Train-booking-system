import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { TrainService } from 'src/app/services/train.service';
import { notyfFactory } from 'src/app/shared/guards/notyf.token';



describe('TrainService', () => {
  let service: TrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, TranslateModule.forRoot() ],
      providers: [{ provide: Notyf, useFactory: notyfFactory }],
  })
  .compileComponents();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})
});
