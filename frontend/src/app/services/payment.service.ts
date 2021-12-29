import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  BASE_URL = window.location.origin + '/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  toCheckout() {
    this.http.post(this.BASE_URL + '/payment', {});
  }
}
