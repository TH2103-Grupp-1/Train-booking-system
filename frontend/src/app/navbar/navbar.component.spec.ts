import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../services/localization.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let translate: TranslateService;
  let localization: LocalizationService;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let dom: any;
  let button: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [LocalizationService],
      imports: [TranslateModule.forRoot()]
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
    // localization = new LocalizationService(translate);
    // component = new NavbarComponent(localization);
    // localization = TestBed.inject(TranslateService);

    expect(component).toBeTruthy();
  });

  // it('should show dropDown menu with languages', () => {
  //   let menu = de.query(By.css('.navbar-toggler.collapsed'));
  //   expect(menu).toBeTruthy();

  //   // // trigger the menu
  //   // button.click();

  //   // // mat menu should be open now
  //   // menu = de.query(By.css('.nav-item.dropdown.show'));
  //   // expect(menu).toBeTruthy();

  // })

});
