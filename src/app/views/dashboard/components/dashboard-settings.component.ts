import { Component } from '@angular/core';

import { select } from '@angular-redux/store';
import { DashboardActions } from '../api/actions';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent {

  @select(['dashboard']) public data; // select data from store

  constructor(private dispatcher: DashboardActions) {}

  settingsModified(settings, $event) {
    $event.preventDefault();
    this.dispatcher.settingsModified();
  }

}
