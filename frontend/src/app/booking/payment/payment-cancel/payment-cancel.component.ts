import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.router.navigateByUrl('/');
  }
}
