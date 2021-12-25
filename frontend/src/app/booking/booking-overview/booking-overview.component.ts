import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.css']
})
export class BookingOverviewComponent implements OnInit {

  booking!: Booking;

  constructor(private bookingService: BookingBuilderService, private route: Router) {

    this.booking = bookingService.getBooking();
    if(this.booking === undefined) { route.navigateByUrl('/'); }
   }

  ngOnInit(): void {
  }


  submit() {
    this.route.navigateByUrl('/payment');
  }

}
