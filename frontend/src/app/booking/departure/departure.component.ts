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
  testdate!: Date;
  currentDate!: Date;
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
            train.BasePrice * this.booking.Distance!
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
  }

  deleteTravelerer(index: number) {
    console.log(this.travelers);
    this.travelers.splice(index, 1);
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
      alert('')
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
