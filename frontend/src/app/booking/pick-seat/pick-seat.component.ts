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

  selectSeat(seat: number, seatId: number) {
    this.selectedSeat.push(seat);
    this.booking.SeatId = seatId;
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
}
