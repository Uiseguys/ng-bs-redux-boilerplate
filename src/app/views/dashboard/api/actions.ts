import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class DashboardActions {
  static readonly DASHBOARD_INITIALIZED = 'DASHBOARD_INITIALIZED';
  static readonly DASHBOARD_DESTROYED = 'DASHBOARD_DESTROYED';
  static readonly SETTINGS_MODIFIED = 'app/dashboard/settings-modified';
  static readonly DATA_RECEIVED = 'app/dashboard/DATA_RECEIVED';

  @dispatch()
  public dashboardInitialized = (): Action => ({
    type: DashboardActions.DASHBOARD_INITIALIZED
  });

  public dashboardDestroyed = (): Action => ({
    type: DashboardActions.DASHBOARD_DESTROYED
  })

  public settingsModified = (): Action => ({
    type: DashboardActions.SETTINGS_MODIFIED
  })

  public dataReceived = (payload: any): any => ({
    type: DashboardActions.DATA_RECEIVED,
    payload: payload
  });

}
