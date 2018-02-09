import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Action } from 'redux';
import { LocalSettingsActions } from './actions';

@Injectable()
export class LocalSettingsObservers {

  constructor(private settingsActions: LocalSettingsActions) {}

  public onCompactViewActivated(): Epic<Action, any> {
     return (action$, store) => action$
       .ofType(LocalSettingsActions.COMPACT_VIEW_ACTIVATED)
       .do((action: any) => { return; });
   }

   public onCompactViewDeactivated(): Epic<any, any> {
      return (action$, store) => action$
        .ofType(LocalSettingsActions.COMPACT_VIEW_DEACTIVATED)
        .do((action: any) => { return; });
    }

}
