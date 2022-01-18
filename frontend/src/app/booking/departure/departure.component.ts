import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { debounceTime, first, flatMap, map, Observable, switchMap, take, tap, timeout } from 'rxjs';
// import { log } from 'console';
import { Booking } from 'src/app/models/booking.model';
import { TrainTimeTable } from 'src/app/models/timetable.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { Ticket, AgeGroup } from "../../models/tickets.model";

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DepartureComponent implements OnInit {
  booking!: Booking;
  trainTimeTables!: TrainTimeTable[];
  currentDate: Date;
  myDate!: Date;
  changeDate!: number;
  nextDate!: Date;
  nextDay!: number;
  previousDate!: Date;
  previousDay!: number;
  isChecked = false;
  counter: number = 0;
  selectedDeparture!: TrainTimeTable;
  panelOpenState = false;
  page: number = 1;
  departurePrice?: number;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;


  constructor(private bookingService: BookingBuilderService, private timeTableService: TimetableService, private route: Router, private darkModeService: DarkModeService) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {

    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
      this.timeTableService.getTimeTables().pipe(map(t => {
        for (let train of t) {
          train.PriceTotal = Math.round(train.BasePrice * this.booking.Distance! + 3);
          const d1 = new Date('1970-01-01 ' + train.ArrivalTime);
          const d2 = new Date('1970-01-01 ' + train.DepartureTime);
          var difference = d1.getTime() - d2.getTime();
          train.Time = `${new Date(difference).getHours() - 1}:${new Date(difference).getMinutes()}h`
        }
        this.trainTimeTables = t;
      })).subscribe();
        this.darkMode$.subscribe(dm => {
          setTimeout(() => {
            let container = document.getElementById("container");
            let panels = document.getElementsByClassName("mat-expansion-panel");
            let priceBoxes = document.getElementsByClassName("price-box-first");
            let titles = document.getElementsByClassName("mat-expansion-panel-header-title");
            let button = document.getElementById("ticket-button");
            if (dm === true) {
              container?.classList.remove("light-mode");
              container?.classList.add("dark-mode");
              button?.classList.add("dark-mode");
            } else {
              container?.classList.add("light-mode");
              container?.classList.remove("dark-mode");
              button?.classList.remove("dark-mode");
            }
            for (let i = 0; i < this.trainTimeTables.length; i++) {
              if (dm == true) {
                titles[i].classList.add("dark-mode")
                priceBoxes[i].classList.remove("light-mode")
                priceBoxes[i].classList.add("dark-mode")
                panels[i].classList.add("dark-mode")
              } else {
                titles[i].classList.remove("dark-mode")
                priceBoxes[i].classList.remove("dark-mode")
                priceBoxes[i].classList.add("light-mode")
                panels[i].classList.remove("dark-mode")
              }
            }
          });
        });

      this.booking.Travelers = [];
    }
    this.myDate = this.booking.DepartureDate!;
    this.prepare();
  }

  //---------------------------------Tickets---------------------------------

  tickets: Ticket[] = [{ id: 0, ageGroup: 'adult', price: 39 }];

  ageGroups: AgeGroup[] = [
    {
      value: "child",
      viewValue: "Child",
      price: 26
    },
    {
      value: "adult",
      viewValue: "Adult",
      price: 39
    },
    {
      value: "retired",
      viewValue: "Retired",
      price: 26
    }
  ]

  addTicket() {
    if (this.tickets.length < 9) {
      this.counter++;
      this.tickets.push({ id: this.counter, ageGroup: 'adult', price: 39 });
      this.resetId();
      this.booking.Price = this.calculateTotalPrice();
    }
  }

  changeTicket(index: number, value: string) {
    for (let traveler of this.tickets) {
      if (index === traveler.id) {
        traveler.ageGroup = value;

        switch (value) {
          case 'adult':
            traveler.price = 39;
            break;
          case 'child':
            traveler.price = 26;
            break;
          case 'retired':
            traveler.price = 26
            break;
        }
        this.booking.Price = this.calculateTotalPrice();
      }
    }
  }

  deleteTicket(index: number) {
    if (this.tickets.length > 1) {
      this.tickets.splice(index, 1);
      this.resetId();
      this.booking.Price = this.calculateTotalPrice();
    }
  }

  resetId() {
    this.counter = 0;
    for (let traveler of this.tickets) {
      traveler.id = this.counter;
      this.counter++;
    }
  }

  calculateTotalPrice(): number {
    let sum: number = 0;
    for (let ticket of this.tickets) {
      if (this.tickets.length > 1) {
        if (this.departurePrice) {
          sum += (80 / 100) * this.departurePrice + ticket.price;
        }
      }
      else {
        if (this.departurePrice) {
          sum += this.departurePrice + ticket.price;
        }
      }
    }
    return Math.round(sum);
  }

  prepare() {
    if (this.booking.DepartureDate === undefined) {
      // this.booking.DepartureDate = this.currentDate
    }
    else {
      this.myDate = this.booking.DepartureDate!;
      //sets mydate to a Date we can change
      this.changeDate = this.myDate.setDate(this.myDate.getDate());
      // nextdate
      this.nextDate = new Date(this.booking.DepartureDate!);
      // set next date to show next day
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.previousDate = new Date(this.booking.DepartureDate!);
      // Show departures on previous day.
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() - 1
      );
    }
  }

  // Show deparures on date after "today" or picked date.
  showNextDay() {
    //  this.currentDate = new Date();
    const hidePrevDate = document.querySelector('.pagination-icon-previous-hidden') as HTMLElement
    hidePrevDate.style.opacity = "1"
    hidePrevDate.style.pointerEvents = "auto"

    if (this.myDate !== this.nextDate) {
      this.changeDate = this.myDate.setDate(this.myDate.getDate() + 1);
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() + 1
      );
    } else if (this.myDate === this.nextDate) {
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.previousDay = this.previousDate.setDate(this.previousDate.getDate() + 1)
    }
  }


  showPreviousDay() {
    //  this.currentDate = new Date();
    const hidePrevDate = document.querySelector('.pagination-icon-previous-hidden') as HTMLElement
    if (this.currentDate.getDate() === this.myDate.getDate() && this.currentDate.getMonth() === this.myDate.getMonth()) {

      hidePrevDate.style.opacity = "0.5"
      hidePrevDate.style.pointerEvents = "none"

      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.changeDate = this.myDate.setDate(this.myDate.getDate() + 1);
      this.previousDay = this.previousDate.setDate(this.previousDate.getDate() + 1,
      );
    }
    if (this.myDate !== this.nextDate) {
      this.changeDate = this.myDate.setDate(this.myDate.getDate() - 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() - 1
      );
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() - 1);
    } else if (this.myDate === this.nextDate) {
      this.previousDay = this.previousDate.setDate(this.previousDate.getDate() - 1);
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() - 1);
    }
  }

  selectDeparture(departure: TrainTimeTable) {
    this.selectedDeparture = departure;
    this.departurePrice = departure.PriceTotal
    this.booking.Price = this.calculateTotalPrice();
  }

  submit() {
    this.selectedDeparture.ArrivalTime = new Date(`${this.myDate.getFullYear()}-${("0" + this.myDate.getMonth() + 1).slice(-2)}-${this.myDate.getDate()}T${this.selectedDeparture.ArrivalTime?.toString()}`);
    this.selectedDeparture.DepartureTime = new Date(`${this.myDate.getFullYear()}-${("0" + this.myDate.getMonth() + 1).slice(-2)}-${this.myDate.getDate()}T${this.selectedDeparture.DepartureTime?.toString()}`);
    this.booking.Tickets = this.tickets;
    this.booking.TimeTable = this.selectedDeparture;
    this.booking.TravelTime = this.selectedDeparture.Time;
    this.tickets.forEach(t => {
      let travelerType: number;
      if (t.ageGroup == 'adult') {
        travelerType = 0;
      }
      if (t.ageGroup == 'adult') {
        travelerType = 3;
      }
      if (t.ageGroup == 'adult') {
        travelerType = 1;
      }
      this.booking.Travelers?.push(travelerType!)
    });
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
  }
}



