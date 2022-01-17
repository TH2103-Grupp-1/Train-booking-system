import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Confirmation } from 'src/app/models/confirmation.model';
import { PaymentService } from 'src/app/services/payment.service';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  SESSION_ID!: string | null;

  confirmation!: Confirmation;

  userName: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private paymentService: PaymentService,
    private bookingService: BookingService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.SESSION_ID = this.route.snapshot.queryParamMap.get('session_id');
    if(this.authService.currentUser !== null) {
      this.userName = `${this.authService.currentUser.FirstName} ${this.authService.currentUser.LastName}`;
    }
    this.paymentService.getSessionDetails(this.SESSION_ID!).subscribe(o => {
      if(o.message === "Not found") { this.router.navigateByUrl('/'); }
      this.confirmation = o.message;
      this.bookingService.postBooking(this.confirmation);
    });
  }

}
