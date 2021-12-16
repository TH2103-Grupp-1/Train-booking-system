import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalizationService } from '../services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: LocalizationService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.translate.loadLanguages();
    this.isLoggedIn();
  }

  isLoggedIn() : boolean {
    let user = this.authService.currentUser;
    if(user !== null) {
      if(Object.keys(user).length !== 0) {
        return true;
    }
    } return false;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
