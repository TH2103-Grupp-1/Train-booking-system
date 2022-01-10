import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { log } from 'console';
import { Booking } from 'src/app/models/booking.model';
import { TrainTimeTable } from 'src/app/models/timetable.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { TicketInterface } from "../../models/tickets.model";

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css'],
})
export class DepartureComponent implements OnInit {
  booking!: Booking;
  trainTimeTables!: TrainTimeTable[];

  constructor(
    private bookingService: BookingBuilderService,
    private timeTableService: TimetableService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
      this.timeTableService.getTimeTables().subscribe((t) => {
        for (let train of t) {
          train.PriceTotal = Math.round(
            train.BasePrice * this.booking.Distance!
          );
        }
        this.trainTimeTables = t;
      });
    }
    this.calculateTime();
    this.booking
  }

  //---------------------------------Tickets---------------------------------

  tickets: TicketInterface[] = [{ id: 0, ageGroup: 'adult', price: 39 }];
  ageGroups = new Array<string>();
  counter: number = 0;

  addTicket() {
    if (this.tickets.length < 9) {
      this.counter++;
      this.tickets.push({ id: this.counter, ageGroup: 'adult', price: 39 });
      this.resetId();
      this.booking.Price = this.calculateTotalPrice();
    }
    console.log(this.tickets);
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
    console.log(this.tickets);
  }

  deleteTicket(index: number) {
    this.tickets.splice(index, 1);
    this.resetId();
    this.booking.Price = this.calculateTotalPrice();
    console.log(this.tickets);
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
    for (let traveler of this.tickets) {
      sum += traveler.price;
    }
    if (this.departurePrice) {
      sum += this.departurePrice
    }
    return sum;
  }

  //---------------------------------Tickets---------------------------------

  calculateTime() {
    for (let time of this.trainTimeTables) {
      //calc arrivaltim - departuretime and get to MILISEC
      var date3 = time.ArrivalTime!.getTime() - time.DepartureTime!.getTime();
      console.log(date3);
      //check days
      var dagar = Math.floor(date3 / (60 * 60 * 24 * 1000));
      var datum4 = date3 / (60 * 60 * 1000) - dagar * 24;
      //Calc milisec to hours and minutes
      var decimalTid = datum4 * 60 * 60;
      var hours = Math.floor(decimalTid / (60 * 60));
      var diff5 = decimalTid - hours * 60 * 60;
      var minutes = Math.floor(diff5 / 60);
      time.Time! = String(' ' + hours + ':' + minutes + ' h');
    }
  }
  // ********************************************************
  // Get the current to date next and previous dates
  myDate = new Date();
  //sets mydate to a Date we can change
  changeDate: number = this.myDate.setDate(this.myDate.getDate());

  // nextdate
  nextDate = new Date();
  // set next date to show next day
  nextDay: number = this.nextDate.setDate(this.nextDate.getDate() + 1);

  // Show deparures on date after today.
  showNextDay() {
    if (this.myDate !== this.nextDate) {
      this.changeDate = this.myDate.setDate(this.myDate.getDate() + 1);
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() + 1
      );
    } else if (this.myDate === this.nextDate) {
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() + 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() + 1
      );
    }
  }

  previousDate = new Date();
  // Show departures on previous day.
  previousDay: number = this.previousDate.setDate(
    this.previousDate.getDate() - 1
  );
  showPreviousDay() {
    if (this.myDate !== this.nextDate) {
      this.changeDate = this.myDate.setDate(this.myDate.getDate() - 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() - 1
      );
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() - 1);
    } else if (this.myDate === this.nextDate) {
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() - 1
      );
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() - 1);
    }
  }

  // sets panel false for use to our accordion
  panelExpanded = false;
  selectedDeparture!: TrainTimeTable;

  panelOpenState = false;

  //PaginationService
  totalLength: any;
  page: number = 1;

  totalcost: any;
  departurePrice?: number;

  selectDeparture(departure: TrainTimeTable) {
    this.selectedDeparture = departure;
    this.departurePrice = departure.PriceTotal
    this.booking.Price = this.calculateTotalPrice();
  }

  submit() {
    this.booking.Tickets = this.tickets;
    this.booking.TimeTable = this.selectedDeparture;
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
  }
}
