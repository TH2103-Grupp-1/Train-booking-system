import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })

export class LocalizationService {
  public _languages: string[] = ['sv', 'en'];

  constructor(
    private translate: TranslateService) {
  }

  get languages() { return this._languages };

  public loadLanguages() {
    this.translate.addLangs(this.languages);
  }

  public setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
  }

  public use() {
    this.translate.use(localStorage.getItem('language') || 'sv' );
  }

  public isCurrent(lang: string) {
    return this.translate.currentLang === lang;
  }
}
