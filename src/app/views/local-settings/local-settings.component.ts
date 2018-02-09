import { Component, OnInit } from '@angular/core';
import { I18nActions } from '../../shared/i18n/actions';

import { dispatch, select } from '@angular-redux/store';
import { LocalSettingsActions } from './api/actions';

@Component({
  selector: 'app-local-settings',
  templateUrl: './local-settings.component.html',
  styleUrls: ['./local-settings.component.scss']
})
export class LocalSettingsComponent implements OnInit {
  @select() settings;

  constructor(private i18nActions: I18nActions,
              private settingsActions: LocalSettingsActions) {}

  ngOnInit() {
    console.log('LocalSettingsComponent initialized.');
    this.settingsActions.settingsInitialized();
  }

  changeLanguage(lang) {
    this.i18nActions.languageChange(lang);
  }

  changeView(saveUsername) {
    console.log(saveUsername);
    this.settingsActions.compactViewActivated();
  }
}
