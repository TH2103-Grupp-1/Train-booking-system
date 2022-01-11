import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserBooking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  userBooking!: Observable<UserBooking[]>

  constructor(private authService: AuthService, private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.userBooking = this.bookingService.getBookingsByUserId(this.authService.currentUser!.Id);
  }

  goBack() {
    this.router.navigateByUrl('/account');
  }

}
