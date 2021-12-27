import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  name: string | undefined;

  constructor(authService: AuthService) {
    this.name = authService.currentUser?.FirstName;
   }

  ngOnInit(): void {
  }

}
