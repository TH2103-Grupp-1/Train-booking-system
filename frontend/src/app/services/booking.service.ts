import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserBooking } from '../models/booking.model';
import { Confirmation } from '../models/confirmation.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.BASE_URL;
  }

  ngOnInit(): void {
  }

  postBooking(confirmation: Confirmation): void {
    this.http.post<Confirmation>(this.BASE_URL + '/bookings', confirmation).subscribe();
  }

  getBookingsByUserId(userId: number) : Observable<UserBooking[]> {
    return this.http.get<UserBooking[]>(`${this.BASE_URL}/bookings/user/${userId}`)
  }
}
