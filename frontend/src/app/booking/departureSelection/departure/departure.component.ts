import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { TimeTable } from 'src/app/models/timetable.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {

  booking!: Booking;

  constructor(private bookingService: BookingBuilderService, private route: Router) {}

  ngOnInit(): void {

    if(this.bookingService.getBooking() === undefined) {
     this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();

    }


    // if(this.booking)

    //get total length of table
    this.totalLength = this.tableData.length
  }

  //testa data for departures
  tableData: TimeTable[] = [
    { Id: 2, DepartureTime: new Date("2021-12-25: 08:45"), ArrivalTime: new Date("2021-12-25: 14:05")},
    { Id: 3, DepartureTime: new Date("2021-12-25: 09:45"), ArrivalTime: new Date("2021-12-25: 15:05") },
    { Id: 4, DepartureTime: new Date("2021-12-25: 10:45"), ArrivalTime: new Date("2021-12-25: 16:05") },
    { Id: 5, DepartureTime: new Date("2021-12-25: 11:45"), ArrivalTime: new Date("2021-12-25: 17:05") },
    { Id: 6, DepartureTime: new Date("2021-12-25: 17:45"), ArrivalTime: new Date("2021-12-25: 18:05") },
    { Id: 1, DepartureTime: new Date("2021-12-25: 07:45"), ArrivalTime: new Date("2021-12-25: 13:05") },
    { Id: 7, DepartureTime: new Date("2021-12-25: 18:45"), ArrivalTime: new Date("2021-12-25: 19:05") },
    { Id: 8, DepartureTime: new Date("2021-12-25: 19:45"), ArrivalTime: new Date("2021-12-25: 20:05") },
    { Id: 9, DepartureTime: new Date("2021-12-25: 20:45"), ArrivalTime: new Date("2021-12-25: 21:05") },
    { Id: 11, DepartureTime: new Date("2021-12-25: 07:30"), ArrivalTime: new Date("2021-12-25: 13:05") },
    { Id: 10, DepartureTime: new Date("2021-12-25: 06:30"), ArrivalTime: new Date("2021-12-25: 12:05") },
    { Id: 12, DepartureTime: new Date("2021-12-25: 08:30"), ArrivalTime: new Date("2021-12-25: 14:05") },
    { Id: 13, DepartureTime: new Date("2021-12-25: 09:45"), ArrivalTime: new Date("2021-12-25: 15:05") },
    { Id: 14, DepartureTime: new Date("2021-12-25: 10:20"), ArrivalTime: new Date("2021-12-25: 16:05") },
    { Id: 15, DepartureTime: new Date("2021-12-25: 11:25"), ArrivalTime: new Date("2021-12-25: 17:05") },
    { Id: 16, DepartureTime: new Date("2021-12-25: 07:40"), ArrivalTime: new Date("2021-12-25: 13:05") },
    { Id: 17, DepartureTime: new Date("2021-12-25: 08:30"), ArrivalTime: new Date("2021-12-25: 14:05") },
    { Id: 18, DepartureTime: new Date("2021-12-25: 09:30"), ArrivalTime: new Date("2021-12-25: 15:05") },
    { Id: 19, DepartureTime: new Date("2021-12-25: 10:10"), ArrivalTime: new Date("2021-12-25: 16:05") },
    { Id: 20, DepartureTime: new Date("2021-12-25: 11:15"), ArrivalTime: new Date("2021-12-25: 17:05") },
  ]



  // ********************************************************
  // Get the current to date next and previous dates
  myDate = new Date();
  // nextdate
  nextDay: number = this.myDate.getDate() + 1;

  // Show deparures on date after today.
  showNextDay() {
    this.nextDay = this.nextDay + 1;
    this.previousDay = this.previousDay + 1;
  }
  // Show departures on previous day.
  previousDay: number = this.myDate.getDate() - 1;
  showPreviousDay() {
    this.previousDay = this.previousDay - 1;
    this.nextDay = this.nextDay - 1;
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


  totalcost: any;


  selectDeparture(departure: TimeTable) {
    this.selectedDeparture = departure;
    console.log(this.selectDeparture);
  }

  selectedPrice() {
    this.totalcost
  }

  submit() {
    this.booking.TimeTable = this.selectedDeparture;
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
  }


}
