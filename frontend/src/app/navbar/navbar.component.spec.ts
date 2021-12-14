import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../services/localization.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let navbar: NavbarComponent;
  let translate: TranslateService;
  let localization: LocalizationService;
  let fixture: ComponentFixture<NavbarComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ NavbarComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NavbarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    localization = new LocalizationService(translate);
    navbar = new NavbarComponent(localization);
    expect(navbar).toBeTruthy();
  });
});
