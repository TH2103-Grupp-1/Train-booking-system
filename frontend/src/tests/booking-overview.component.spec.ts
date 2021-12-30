import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BookingOverviewComponent } from 'src/app/booking/booking-overview/booking-overview.component';

describe('BookingOverviewComponent', () => {
  let component: BookingOverviewComponent;
  let fixture: ComponentFixture<BookingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingOverviewComponent ],
      imports: [RouterTestingModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
