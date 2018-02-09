import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Action } from 'redux';

@Injectable()
export class DashboardObservers {

  constructor(
  ) {}

  public createEpic(): Epic<Action, any> {

    return (action$, store) => action$
      .ofType('DASHBOARD_INITIALIZED')
      .do((action: any) => { console.log(action); });
  }

}


