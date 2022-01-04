import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Confirmation } from '../models/confirmation.model'

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
}
