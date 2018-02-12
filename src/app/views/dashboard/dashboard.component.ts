import { Component, OnInit } from '@angular/core';
import { DashboardActions } from './api/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashbaordComponent implements OnInit {

  constructor(private dashboardActions: DashboardActions) {}

  ngOnInit() {
    console.log('on init component');
    this.dashboardActions.dashboardInitialized();
  }
}
