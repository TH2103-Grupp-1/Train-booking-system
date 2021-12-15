import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalizationService } from '../services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: LocalizationService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.translate.loadLanguages();
  }

}
