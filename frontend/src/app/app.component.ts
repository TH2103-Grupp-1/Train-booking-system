import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'train-booking-system';

  constructor(localization: LocalizationService) {
    localization.use();
  }

}
