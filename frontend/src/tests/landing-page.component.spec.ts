import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { StationService } from 'src/app/services/station.service';

import { LandingPageComponent } from '../app/landing-page/landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let stationService: StationService;
  let bookingService: BookingBuilderService;
  let route: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule  ],
      providers: [RouterTestingModule, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
