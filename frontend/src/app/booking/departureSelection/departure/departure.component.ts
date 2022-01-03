import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { TimeTable } from 'src/app/models/timetable.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css'],
})
export class DepartureComponent implements OnInit {
  booking!: Booking;

  constructor(
    private bookingService: BookingBuilderService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
    }
    // console.log('datum3 ' + this.datum3);
    // console.log('dat4 ' + this.dat4);

    this.calculateTime();

    // console.log(this.timeCalculation(this.selectedTime));
    // console.log('diff' + this.diff)
    // this.timeCalculation(this.decToTime);
    // console.log(this.timeCalculation(this.decToTime));
    // if(this.booking)

    //get total length of table
    this.totalLength = this.tableData.length;
  }

  //testa data for departures
  tableData: TimeTable[] = [
    {
      Id: 1,
      DepartureTime: new Date('2021-12-29: 07:45'),
      ArrivalTime: new Date('2021-12-29: 13:05'),
    },
    {
      Id: 2,
      DepartureTime: new Date('2021-12-28: 08:45'),
      ArrivalTime: new Date('2021-12-28: 14:05'),
    },
    {
      Id: 3,
      DepartureTime: new Date('2021-12-28: 09:45'),
      ArrivalTime: new Date('2021-12-28: 15:05'),
    },
    {
      Id: 4,
      DepartureTime: new Date('2021-12-28: 10:45'),
      ArrivalTime: new Date('2021-12-28: 16:05'),
    },
    {
      Id: 5,
      DepartureTime: new Date('2021-12-28: 11:45'),
      ArrivalTime: new Date('2021-12-28: 17:05'),
    },
    {
      Id: 6,
      DepartureTime: new Date('2021-12-28: 17:45'),
      ArrivalTime: new Date('2021-12-28: 18:05'),
    },
    {
      Id: 7,
      DepartureTime: new Date('2021-12-29: 18:45'),
      ArrivalTime: new Date('2021-12-29: 19:05'),
    },
    {
      Id: 8,
      DepartureTime: new Date('2021-12-29: 19:45'),
      ArrivalTime: new Date('2021-12-29: 20:05'),
    },
    {
      Id: 9,
      DepartureTime: new Date('2021-12-29: 20:45'),
      ArrivalTime: new Date('2021-12-29: 21:05'),
    },
    {
      Id: 11,
      DepartureTime: new Date('2021-12-30: 07:30'),
      ArrivalTime: new Date('2021-12-30: 13:05'),
    },
    {
      Id: 10,
      DepartureTime: new Date('2021-12-30: 06:30'),
      ArrivalTime: new Date('2021-12-30: 12:05'),
    },
    {
      Id: 12,
      DepartureTime: new Date('2021-12-30: 08:30'),
      ArrivalTime: new Date('2021-12-30: 14:05'),
    },
    {
      Id: 13,
      DepartureTime: new Date('2021-12-30: 09:45'),
      ArrivalTime: new Date('2021-12-30: 15:05'),
    },
    {
      Id: 14,
      DepartureTime: new Date('2021-12-30: 10:20'),
      ArrivalTime: new Date('2021-12-30: 16:05'),
    },
    {
      Id: 15,
      DepartureTime: new Date('2021-12-30: 11:25'),
      ArrivalTime: new Date('2021-12-30: 17:05'),
    },
    {
      Id: 16,
      DepartureTime: new Date('2021-12-31: 07:40'),
      ArrivalTime: new Date('2021-12-31: 13:05'),
    },
    {
      Id: 17,
      DepartureTime: new Date('2021-12-31: 08:30'),
      ArrivalTime: new Date('2021-12-31: 14:05'),
    },
    {
      Id: 18,
      DepartureTime: new Date('2021-12-31: 09:30'),
      ArrivalTime: new Date('2021-12-31: 15:05'),
    },
    {
      Id: 19,
      DepartureTime: new Date('2021-12-31: 10:10'),
      ArrivalTime: new Date('2021-12-31: 16:05'),
    },
    {
      Id: 20,
      DepartureTime: new Date('2021-12-31: 11:15'),
      ArrivalTime: new Date('2021-12-31: 17:05'),
    },
  ];

  datum1: any = new Date('2022-01-01: 07:45');
  datum2: any = new Date('2022-01-01: 13:05');

  //TODO

  // deptime: any = this.tableData;
  // times = this.deptime.DepartureTime;
  selectedTime!: string;
  calculateTime() {
    for (let time of this.tableData) {
      //calc arrivaltim - departuretime and get to MILISEC
      var date3 = time.ArrivalTime!.getTime() - time.DepartureTime!.getTime();
      var dagar = Math.floor(date3 / (60 * 60 * 24 * 1000));
      var datum4 = date3 / (60 * 60 * 1000) - dagar * 24;
      //Calc milisec to hours and minutes
      var decimalTid = datum4 * 60 * 60;
      var hours = Math.floor(decimalTid / (60 * 60));
      var diff5 = decimalTid - hours * 60 * 60;
      var minutes = Math.floor(diff5 / 60);
      time.Time! = String(hours + ':' + minutes + 'h');
    }
  }
  //diff
  datum3 = this.datum2.getTime() - this.datum1.getTime();

  days = Math.floor(this.datum3 / (60 * 60 * 24 * 1000));
  dat4 = this.datum3 / (60 * 60 * 1000) - this.days * 24;

  decToTime = this.dat4.toString();
  decimalTime = parseFloat(this.decToTime);

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

    // this.previousDay = this.previousDay - 1;
    // this.nextDay = this.nextDay - 1;
  }

  // calculate what day is shown on the "nextday" and "previousday" on page.

  // visibleNextday() {

  // }

  // *****************************************************

  // sets panel false for use to our accordion
  panelExpanded = false;
  selectedDeparture!: TimeTable;
  panelOpenState = false;

  //PaginationService
  totalLength: any;
  page: number = 1;
  // totalcost: any;

  // check if price button is toggled and call with function so see if its clicked
  toggled = true;
  // checktoggled() {
  //   this.selectedDeparture.Id
  //   this.toggled = !this.toggled;

  // }
  // testa!: TimeTable;

  selectDeparture(departure: TimeTable) {
    // this.testa = this.selectedDeparture.ArrivalTime
    this.selectedDeparture = departure;
    this.toggled = !this.toggled;

    // console.log(test)
  }

  submit() {
    this.booking.Train = {
      Id: 1,
      Model: 'SJ High-speed train X 2000',
      Carriages: [
        {
          Id: 1,
          CarriageNumber: 1,
          Seats: [
            { SeatNumber: 1 },
            { SeatNumber: 2 },
            { SeatNumber: 3 },
            { SeatNumber: 4 },
            { SeatNumber: 5 },
            { SeatNumber: 6 },
            { SeatNumber: 4 },
            { SeatNumber: 5 },
            { SeatNumber: 6 },
            { SeatNumber: 4 },
            { SeatNumber: 5 },
            { SeatNumber: 6 },
          ],
        },
      ],
    };

    this.booking.TimeTable = this.selectedDeparture;
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
  }
}
