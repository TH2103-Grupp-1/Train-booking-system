import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
})
export class DepartureComponent implements OnInit {
  booking!: Booking;
  trainTimeTables!: TrainTimeTable[];
  testdate!: Date;
  currentDate: Date;
  myDate!: Date;
  changeDate!: number;
  nextDate!: Date;
  nextDay!: number;
  previousDate!: Date;
  previousDay!: number;


  constructor(
    private bookingService: BookingBuilderService,
    private timeTableService: TimetableService,
    private route: Router
  ) {
    this.currentDate = new Date();

  }

  ngOnInit(): void {
    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
      this.timeTableService.getTimeTables().subscribe((t) => {
        for (let train of t) {
          train.PriceTotal = Math.round(
            train.BasePrice * this.booking.Distance! + 3
          );
        }
        this.trainTimeTables = t;
      });



    }
    this.myDate = this.booking.DepartureDate!;
console.log(this.currentDate);
      console.log(this.myDate);
    this.prepare();
    // this.testfunk();
    // this.calculateTime();
    this.calculateTime();
    this.booking
  }

  //---------------------------------Tickets---------------------------------

  tickets: Ticket[] = [{ id: 0, ageGroup: 'adult', price: 39}];
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
  counter: number = 0;

  addTicket() {
    if (this.tickets.length < 9) {
      this.counter++;
      this.tickets.push({ id: this.counter, ageGroup: 'adult', price: 39 });
      this.resetId();
      this.booking.Price = this.calculateTotalPrice();
      this.booking.Travelers?.push(1);
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
  }

  // deleteTravelerer(index: number) {
  //   this.travelers.splice(index, 1);
  //   console.log(this.tickets);
  // }

  deleteTicket(index: number) {
    if (this.tickets.length > 1) {
      this.tickets.splice(index, 1);
      this.resetId();
      this.booking.Price = this.calculateTotalPrice();
      console.log(this.tickets);
      this.booking.Travelers?.shift();
    }
  }

  // calculateTime() {

  //   for (let time of this.trainTimeTables) {
  //     //calc arrivaltim - departuretime and get to MILISEC
  //     let date3 = time.ArrivalTime!.getTime() - time.DepartureTime!.getTime();
  //     console.log(date3);
  //     //check days
  //     let dagar = Math.floor(date3 / (60 * 60 * 24 * 1000));
  //     let datum4 = date3 / (60 * 60 * 1000) - dagar * 24;
  //     //Calc milisec to hours and minutes
  //     let decimalTid = datum4 * 60 * 60;
  //     let hours = Math.floor(decimalTid / (60 * 60));
  //     let diff5 = decimalTid - hours * 60 * 60;
  //     let minutes = Math.floor(diff5 / 60);
  //     time.Time! = String(' ' + hours + ':' + minutes + ' h');
  //   }
  // }

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
    console.log('current from nextday '+this.currentDate);
    console.log('mydate from nextday ' + this.myDate);
        console.log('log departureday day '+this.booking.DepartureDate);

    //  this.currentDate = new Date();
    const hidePrevDate = document.querySelector('.pagination-icon-previous-hidden') as HTMLElement
      hidePrevDate.style.opacity = "1"
         hidePrevDate.style.pointerEvents = "auto"
    // if (this.currentDate.getDate() !== this.myDate.getDate() && this.currentDate.getMonth() !== this.myDate.getMonth()){

    // }

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

  // testfunk() {
  //   // const hidePrevDate = document.querySelector('.pagination-icon-previous-hidden') as HTMLElement
  //      if (this.currentDate.getDay() === this.myDate.getDay()) {
  //       // hidePrevDate.style.opacity = "1"
  //       //  hidePrevDate.style.pointerEvents = "auto"
  //        alert('')

  //     }
  // }

  showPreviousDay() {
//  this.currentDate = new Date();
   console.log('current from prevday '+this.currentDate);
    console.log('mydate from prevday ' + this.myDate);
    console.log('log departureday prevday ' + this.booking.DepartureDate);
    // console.log('previous day' + this.previousDay);



    const hidePrevDate = document.querySelector('.pagination-icon-previous-hidden') as HTMLElement
    if (this.currentDate.getDate() === this.myDate.getDate() && this.currentDate.getMonth() === this.myDate.getMonth()) {
      // alert('')
       hidePrevDate.style.opacity = "0.5"
       hidePrevDate.style.pointerEvents = "none"

      this.nextDay = this.nextDate.setDate(this.nextDate.getDate()+1);
      this.changeDate = this.myDate.setDate(this.myDate.getDate()+1);
        this.previousDay = this.previousDate.setDate(this.previousDate.getDate()+1,
      );
      }
    if (this.myDate !== this.nextDate) {
      this.changeDate = this.myDate.setDate(this.myDate.getDate() - 1);
      this.previousDay = this.previousDate.setDate(
        this.previousDate.getDate() - 1
      );
      this.nextDay = this.nextDate.setDate(this.nextDate.getDate() - 1);
    }  else if (this.myDate === this.nextDate) {
      this.previousDay = this.previousDate.setDate(this.previousDate.getDate() - 1);



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
    this.selectedDeparture.ArrivalTime = new Date(`${this.myDate.toISOString().split('T')[0]} ${this.selectedDeparture.ArrivalTime?.toString()}`);
    this.selectedDeparture.DepartureTime = new Date(`${this.myDate.toISOString().split('T')[0]} ${this.selectedDeparture.DepartureTime?.toString()}`);
    this.booking.Tickets = this.tickets;
    this.booking.TimeTable = this.selectedDeparture;
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/seat');
    console.log(this.myDate);
  }
}
