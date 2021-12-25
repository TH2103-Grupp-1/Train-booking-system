import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { Carriage } from 'src/app/models/carriage.model';
import { TravelerType } from 'src/app/models/traveler.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';

@Component({
  selector: 'app-pick-seat',
  templateUrl: './pick-seat.component.html',
  styleUrls: ['./pick-seat.component.css']
})
export class PickSeatComponent implements OnInit {

  constructor(private bookingService: BookingBuilderService, private route: Router) {

    if (this.bookingService.getBooking() === undefined) {
      this.route.navigateByUrl('/');
    } else {
      this.booking = this.bookingService.getBooking();
    }
  }


  booking!: Booking;
  // train!: Train;
  selectedCarriage!: Carriage;
  selectedSeat: number[] = [];
  maxSeats: number = 0;

  ngOnInit(): void {
    this.maxSeats = this.booking.Travelers!.length;
  }

  selectCarriage(ca: Carriage) {
    this.selectedSeat = [];
    this.selectedCarriage = ca;
  }

  selectSeat(seat: number) {
    this.selectedSeat.push(seat);
    this.selectedCarriage.Seats?.push({ SeatNumber: seat });
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
    this.booking.Train?.Carriages?.push(this.selectedCarriage);
    this.bookingService.updateBooking(this.booking);
    this.route.navigateByUrl('/overview');
  }
}
