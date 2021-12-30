import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking.model';
import { ISession } from '../models/payments.models';
import { BookingBuilderService } from './booking-builder.service';

declare const Stripe: (arg0: string) => any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  BASE_URL: string;

  constructor(private http: HttpClient, private router: Router) {
    this.BASE_URL = environment.BASE_URL;
  }

  ngOnInit(): void {
  }


   postPayment(price: number, productName: string, booking: string): void {
    this.http
      .post<ISession>(this.BASE_URL + '/payment', {
        booking,
        price,
        productName
      })
      .subscribe((session) => {
        this.redirectToCheckout(session);
      });
  }

  async redirectToCheckout(session: ISession) {
    const stripe = Stripe('pk_test_51KBEVTFsTQg8DW3AGXLTJwLT4tuzrxNLWpUTuAF93mGKgNd8hxq9k9vbSqIOmneQto0V6D0LopwkOxGnWBAntXRd00dMZfHBi7')

    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  }
}
