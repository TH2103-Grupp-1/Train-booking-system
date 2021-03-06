import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBooking } from '../../models/booking.model';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  name: string | undefined;
  userBooking!: UserBooking[];

  constructor(private authService: AuthService, private bookingService: BookingService) {
    this.name = authService.currentUser?.FirstName;
  }

  ngOnInit(): void {
    this.bookingService.getBookingsByUserIdAndDate(this.authService.currentUser!.Id).subscribe(ub => {
      this.userBooking = ub;
  })
}

}
