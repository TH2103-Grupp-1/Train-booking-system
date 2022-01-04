import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Confirmation } from 'src/app/models/confirmation.model';
import { PaymentService } from 'src/app/services/payment.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  SESSION_ID!: string | null;

  confirmation!: Confirmation;

  constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.SESSION_ID = this.route.snapshot.queryParamMap.get('session_id');
    this.paymentService.getSessionDetails(this.SESSION_ID!).subscribe(o => {
      if(o.message === "Not found") { this.router.navigateByUrl('/'); }
      this.confirmation = o.message;
      this.bookingService.postBooking(this.confirmation);
    });
  }

}
