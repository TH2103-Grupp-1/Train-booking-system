import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISession } from '../models/payments.models';

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


   requestPaymentSession(priceId: string): void {
    this.http
      .post<ISession>(this.BASE_URL + '/payment', {
        // priceId: priceId,
        // successUrl: environment.success_url,
        // failureUrl: environment.cancel_url,
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
