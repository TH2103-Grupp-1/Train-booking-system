import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  SESSION_ID!: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.SESSION_ID = this.route.snapshot.queryParamMap.get('session_id');
  }

}
