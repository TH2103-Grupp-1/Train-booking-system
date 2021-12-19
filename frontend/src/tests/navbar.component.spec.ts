import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../app/services/localization.service';
import { NavbarComponent } from '../app/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { Notyf } from 'notyf';
import { notyfFactory } from 'src/app/shared/guards/notyf.token';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let dom: any;
  let button: any;
  let authServiceMock: any;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [LocalizationService, { provide: Notyf, useFactory: notyfFactory }],
      imports: [TranslateModule.forRoot(), HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // localization = new LocalizationService(translate);
    fixture.detectChanges;
    dom = fixture.nativeElement;
    button = dom.querySelector('#navbarNavAltMarkup');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user should be logged out', () => {
    authServiceMock = jasmine.createSpyObj(['currentUser']);
    authServiceMock.currentUser.and.returnValue(false);
    let returnValue = component.isLoggedIn();
    expect(returnValue).toBeFalsy();
  })

  it('language should default to swedish, then english when selected', () => {
    component.ngOnInit();
    let country  = fixture.debugElement.query(By.css('#country-initials'));
    let img = fixture.debugElement.query(By.css('.flag-icon'));

    expect(img.nativeNode.src).toContain('assets/images/flag_icon_sv.png');
    expect(country.nativeNode.textContent).toContain('SV');

    component.setLanguage('en');

    country  = fixture.debugElement.query(By.css('#country-initials'));
    img = fixture.debugElement.query(By.css('.flag-icon'));

    expect(img.nativeNode.src).toContain('assets/images/flag_icon_en.png');
    expect(country.nativeNode.textContent).toContain('EN');
  });
});
