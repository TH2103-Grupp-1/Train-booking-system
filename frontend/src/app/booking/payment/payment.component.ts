import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  });

  booking: Booking;

  constructor(private authService: AuthService, private bookingService: BookingBuilderService, private route: Router, private paymentService: PaymentService) {
    this.booking = bookingService.getBooking();
    if(this.booking === undefined) { route.navigateByUrl('/'); }
  }


  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    let currentUser = this.authService.currentUser;
    if (currentUser != null) {
      if (Object.keys(currentUser).length !== 0) {

        this.paymentForm.setValue({ firstName: currentUser.FirstName, lastName: currentUser.LastName, phoneNumber: currentUser.PhoneNumber, email: currentUser.Email })
      }
    }

  }

  checkout() {
    var test = this.paymentService.toCheckout();
  }
}
