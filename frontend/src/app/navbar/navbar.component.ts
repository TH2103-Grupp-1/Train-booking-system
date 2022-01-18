import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { empty, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalizationService } from '../services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(public translate: LocalizationService, private authService: AuthService, private router: Router,
    public darkModeService: DarkModeService) {

  }

  ngOnInit(): void {
    let currentLanguage = localStorage.getItem("language");
    if (currentLanguage !== null) {
      this.setLanguage(currentLanguage);
    } else {
      this.setLanguage('sv');
    }
    this.darkMode$.subscribe(dm => {
      let navbar = document.getElementById("navbar");
      if (dm === true) {
        navbar?.classList.remove("light-mode");
        navbar?.classList.add("dark-mode");
      } else {
        navbar?.classList.add("light-mode");
        navbar?.classList.remove("dark-mode");
      }
    })
  }

  onToggle(): void {
    this.darkModeService.toggle();
    this.darkMode$.subscribe(dm => {
      let navbar = document.getElementById("navbar");
      if (dm === true) {
        navbar?.classList.remove("light-mode");
        navbar?.classList.add("dark-mode");
      } else {
        navbar?.classList.add("light-mode");
        navbar?.classList.remove("dark-mode");
      }
    })
  }

  isLoggedIn(): boolean {
    let user = this.authService.currentUser;
    if (user !== null) {
      if (Object.keys(user).length !== 0) {
        return true;
      }
    } return false;
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
      initials.innerText = "EN";
    }

    if (selected === 'sv') {
      img.src = "/assets/images/flag_icon_sv.png"
      initials.innerText = "SV";
    }
  }

  setLanguage(language: string) {
    this.translate.setLanguage(language);
    this.setLanguageIcon(language);
  }

}
