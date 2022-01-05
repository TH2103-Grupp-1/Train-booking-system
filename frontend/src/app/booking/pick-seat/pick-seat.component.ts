import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { Carriage } from 'src/app/models/carriage.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { TrainService } from 'src/app/services/train.service';
import { Train } from 'src/app/models/train.model';
import { Observable } from 'rxjs';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'app-pick-seat',
  templateUrl: './pick-seat.component.html',
  styleUrls: ['./pick-seat.component.css']
})
export class PickSeatComponent implements OnInit {

  constructor(private bookingService: BookingBuilderService, private trainService: TrainService, private route: Router) {
    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
    }
  }

  carriages!: Carriage[];
  seats!: Observable<Seat[]>;
  booking!: Booking;
  selectedCarriage!: Carriage;
  selectedSeat: number[] = [];
  maxSeats: number = 0;

  ngOnInit(): void {
    this.maxSeats = this.booking.Travelers!.length;
    this.trainService.getTrainCarriages(this.booking.TimeTable?.TrainId!).subscribe(t => {
     this.carriages = t;
    });
  }

  selectCarriage(ca: Carriage) {
    this.selectedSeat = [];
    this.seats = this.trainService.getSeatsForCarriage(ca.Id!);
    this.selectedCarriage = ca;
  }

  selectSeat(seat: number) {
    this.selectedSeat.push(seat);
    
    let doc = document.getElementById('seatsDesktop');
    let seats = doc?.getElementsByClassName('seat');
    
    let reservationTextPhone = document.getElementById('seatReservationPhone');
    let reservationTextDesktop = document.getElementById('seatReservationDesktop');

    reservationTextPhone!.style.textDecoration = "none";
    reservationTextPhone!.classList.add('text-success');

    reservationTextDesktop!.style.textDecoration = "none";
    reservationTextDesktop!.classList.add('text-success');
    

   for(var i = 0; i < seats!.length; i++){
      document.getElementById("phone" + i.toString())!.style.backgroundColor = "darkgrey";
      document.getElementById("desktop" + i.toString())!.style.backgroundColor = "darkgrey";
   }
   document.getElementById("phone" + seat.toString())!.style.backgroundColor = "#1a883d";
   document.getElementById("desktop" + seat.toString())!.style.backgroundColor = "#1a883d";
  }

  change(group: any) {
    if (group.value.length >= this.maxSeats) {
      let newValue = group.value;
      newValue.shift();
      group.value = newValue;
      // this.selectedSeat.push(newValue);
      this.selectedSeat = [];
    }
  }

  submit() {
    for(let seat of this.selectedSeat) {
      this.selectedCarriage.Seats?.push({ SeatNumber: seat });
    }
    this.booking.Train?.Carriages?.push(this.selectedCarriage);
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/overview');
  }

  counter(i: number) {
    return new Array(i);
}

iconTogglePhone(){
  
  document.getElementById('iconPhone')?.classList.toggle('fa-caret-up');  
}
iconToggleDesktop(){
  
  document.getElementById('iconDesktop')?.classList.toggle('fa-caret-up');  
}

}
