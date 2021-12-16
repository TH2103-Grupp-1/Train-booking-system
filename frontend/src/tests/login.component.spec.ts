import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { notyfFactory } from 'src/app/shared/guards/notyf.token';
import { RouterTestingModule } from '@angular/router/testing'

import { LoginComponent } from '../app/auth/components/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [TranslateModule.forRoot(), HttpClientModule, RouterTestingModule],
      providers: [{ provide: Notyf, useFactory: notyfFactory }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
