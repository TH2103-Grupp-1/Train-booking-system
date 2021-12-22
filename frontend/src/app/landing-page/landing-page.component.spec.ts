import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationService } from '../services/station.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let stationsService : StationService

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
    component = new LandingPageComponent(stationsService);
    expect(component).toBeTruthy();
  });
});
