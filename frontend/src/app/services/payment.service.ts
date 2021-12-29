import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  async toCheckout() {
    const url = this.http.post(this.BASE_URL + '/payment', {}).subscribe();
    // let obj = JSON.parse(url);
  }
}
