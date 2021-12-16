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
    let currentLanguage = localStorage.getItem("language");
    if (currentLanguage !== null) {
      this.setLanguage(currentLanguage);
    }
  }

  isLoggedIn() : boolean {
    let user = this.authService.currentUser;
    if(user === null || undefined) {
    return false;
    }
    return true;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  setLanguageIcon(selected: string) {
    const img = document.getElementById('flag-i') as HTMLImageElement;
    const initials = document.getElementById('country-initials') as HTMLSpanElement;

    if (selected === 'en') {
      img.src = "/assets/images/flag_icon_en.png";
      initials.innerHTML = "EN";
    }

    if (selected === 'sv') {
      img.src = "/assets/images/flag_icon_sv.png"
      initials.innerHTML = "SV";
    }
  }

  setLanguage(language: string) {
    this.translate.setLanguage(language);
    this.setLanguageIcon(language);
  }

}
