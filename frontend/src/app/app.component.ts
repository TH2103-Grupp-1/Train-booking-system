import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'train-booking-system';

  constructor(localization: LocalizationService, public translate: TranslateService) {
    localization.use();
    translate.setDefaultLang('en');
  }

}
