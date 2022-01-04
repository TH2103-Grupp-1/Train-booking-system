import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationService } from 'src/app/services/station.service';

import { LandingPageComponent } from '../app/landing-page/landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let stationService: StationService;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ LandingPageComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LandingPageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    component = new LandingPageComponent(stationService);
    expect(component).toBeTruthy();
  });
});