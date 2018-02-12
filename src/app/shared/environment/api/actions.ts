import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class EnvironmentActions {
  static readonly ENVIRONMENT_CONNECTED = 'ENVIRONMENT_CONNECTED';

  @dispatch()
  public isConnected = (payload: any): any => ({
    type: EnvironmentActions.ENVIRONMENT_CONNECTED,
    payload: payload
  })
}
