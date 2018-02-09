import { Component, OnInit } from '@angular/core';

import { dispatch, select, select$, WithSubStore } from '@angular-redux/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashbaordComponent implements OnInit {
  @dispatch() dashboardInitialized = () => ({ type: 'DASHBOARD_INITIALIZED' });

  ngOnInit() {
    console.log('on init component');
    this.dashboardInitialized();
  }
}
