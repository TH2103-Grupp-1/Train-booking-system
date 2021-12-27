import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingBuilderService {

  booking!: Booking;

  constructor() { }

  updateBooking(booking: Booking) {
    this.booking = booking;
  }

  getBooking() : Booking { return this.booking }
}
