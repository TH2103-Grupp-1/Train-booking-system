import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
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
  tableData = [
    { "id": 2, "departure": "08:45", "arrival": "14:05", "secondClass": "468", "firstClass": "798" },
    { "id": 3, "departure": "09:45", "arrival": "15:05", "secondClass": "468", "firstClass": "798" },
    { "id": 4, "departure": "10:45", "arrival": "16:05", "secondClass": "468", "firstClass": "798" },
    { "id": 5, "departure": "11:45", "arrival": "17:05", "secondClass": "468", "firstClass": "798" },
    { "id": 6, "departure": "17:45", "arrival": "18:05", "secondClass": "468", "firstClass": "798" },
    { "id": 1, "departure": "07:45", "arrival": "13:05", "secondClass": "468", "firstClass": "798" },
    { "id": 7, "departure": "18:45", "arrival": "19:05", "secondClass": "468", "firstClass": "798" },
    { "id": 8, "departure": "19:45", "arrival": "20:05", "secondClass": "468", "firstClass": "798" },
    { "id": 9, "departure": "20:45", "arrival": "21:05", "secondClass": "468", "firstClass": "798" },
    { "id": 11, "departure": "07:30", "arrival": "13:05", "secondClass": "468", "firstClass": "798" },
    { "id": 10, "departure": "06:30", "arrival": "12:05", "secondClass": "468", "firstClass": "798" },
    { "id": 12, "departure": "08:30", "arrival": "14:05", "secondClass": "468", "firstClass": "798" },
    { "id": 13, "departure": "09:45", "arrival": "15:05", "secondClass": "468", "firstClass": "798" },
    { "id": 14, "departure": "10:20", "arrival": "16:05", "secondClass": "468", "firstClass": "798" },
    { "id": 15, "departure": "11:25", "arrival": "17:05", "secondClass": "468", "firstClass": "798" },
    { "id": 16, "departure": "07:40", "arrival": "13:05", "secondClass": "468", "firstClass": "798" },
    { "id": 17, "departure": "08:30", "arrival": "14:05", "secondClass": "468", "firstClass": "798" },
    { "id": 18, "departure": "09:30", "arrival": "15:05", "secondClass": "468", "firstClass": "798" },
    { "id": 19, "departure": "10:10", "arrival": "16:05", "secondClass": "468", "firstClass": "798" },
    { "id": 20, "departure": "11:15", "arrival": "17:05", "secondClass": "468", "firstClass": "798" },
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
  selectedDepartureId: number = 0

  panelOpenState = false;

  //PaginationService
  totalLength: any;
  page: number = 1;


  totalcost: any;


  selectDeparture(id: number) {

    this.selectedDepartureId = id;

  }

  selectedPrice() {
    this.totalcost
  }


}
