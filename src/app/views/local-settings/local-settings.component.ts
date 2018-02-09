import { Component, OnInit } from '@angular/core';
import { I18nActions } from '../../shared/i18n/actions';

@Component({
  selector: 'app-local-settings',
  templateUrl: './local-settings.component.html',
  styleUrls: ['./local-settings.component.scss']
})
export class LocalSettingsComponent implements OnInit {

  constructor(private i18nActions: I18nActions) {}

  ngOnInit() {
    console.log('LocalSettingsComponent initialized.');
  }

  changeLanguage(lang) {
    this.i18nActions.languageChange(lang);
  }
}
