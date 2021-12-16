import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalizationService } from '../services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: LocalizationService, public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.translate.loadLanguages();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
