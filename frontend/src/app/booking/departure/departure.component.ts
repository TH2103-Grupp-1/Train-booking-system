import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { log } from 'console';
import { Booking } from 'src/app/models/booking.model';
import { TrainTimeTable } from 'src/app/models/timetable.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { TimetableService } from 'src/app/services/timetable.service';

interface AgeGroupInterface {
  id: number;
  ageGroup: string;
}
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
  }

  travelers: AgeGroupInterface[] = [{ id: 0, ageGroup: 'adult' }];
  counter: number = 0;

  addTraveler() {
    if (this.travelers.length < 9) {
      this.counter++;
      this.travelers.push({ id: this.counter, ageGroup: 'adult' });
    }
  }

  changeTraveler(index: number, value: string) {
    this.counter = 0;

    for (let traveler of this.travelers) {
      traveler.id = this.counter;
      this.counter++;
      if (index === traveler.id) {
        traveler.ageGroup = value;
      }
    }
    console.log(this.travelers);
  }

  deleteTravelerer(index: number) {
    console.log(this.travelers);
    this.travelers.splice(index, 1);
  }

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
  testdate = '2022-01-24';
  myDate = new Date(this.testdate);

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

  selectDeparture(departure: TrainTimeTable) {
    this.selectedDeparture = departure;
    this.booking.Price = departure.PriceTotal;
  }

  submit() {
    this.booking.TimeTable = this.selectedDeparture;
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
    console.log(this.myDate);
  }
}
