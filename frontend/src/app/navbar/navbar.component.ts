import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: LocalizationService) {
    translate.use();
    this.translate.loadLanguages();
  }

  ngOnInit(): void {
  }

}
