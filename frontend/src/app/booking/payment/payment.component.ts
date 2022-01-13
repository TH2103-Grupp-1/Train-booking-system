import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingBuilderService } from 'src/app/services/booking-builder.service';
import { PaymentService } from 'src/app/services/payment.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  travelerMessage!: string;
  paymentForm!: FormGroup;
  booking: Booking;

  constructor(private authService: AuthService, bookingService: BookingBuilderService, router: Router, private paymentService: PaymentService, public dialog: MatDialog) {
    this.booking = bookingService.getBooking();
    if(this.booking === undefined) { router.navigateByUrl('/'); }
    // delete this.booking.Train?.Carriages;
    // delete this.booking.TicketReciever;
    // delete this.booking.Travelers;
    this.travelerMessage = ( this.booking.Travelers!.length === 1) ? 'Traveler' : 'Travelers';
  }


  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl(null, [Validators.required,  Validators.pattern('[a-zA-Z ]*')]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^(\+|[0-9])[1-9][0-9 \-\(\)\.]{7,32}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')])
    });

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


  openDialog() {
    this.dialog.open(PaymentCancelComponent);

  }

  get firstName() {
    return this.paymentForm.get('firstName');

  }

  get lastName() {
    return this.paymentForm.get('lastName');
  }

  get phoneNumber() {
    return this.paymentForm.get('phoneNumber');
  }

  get email() {
    return this.paymentForm.get('email');
  }

  checkout() {
   this.paymentService.postPayment(JSON.stringify(this.booking));
  }
}
