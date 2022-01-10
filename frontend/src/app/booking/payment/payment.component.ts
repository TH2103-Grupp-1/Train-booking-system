import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  booking: Booking;

  constructor(private authService: AuthService, bookingService: BookingBuilderService, router: Router, private paymentService: PaymentService) {
    this.booking = bookingService.getBooking();
    if(this.booking === undefined) { router.navigateByUrl('/'); }
    // delete this.booking.Train?.Carriages;
    // delete this.booking.TicketReciever;
    // delete this.booking.Travelers;
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
   this.paymentService.postPayment(JSON.stringify(this.booking));
  }
}
