import { Action } from 'redux';
import { DashboardActions } from './actions';

export interface DashboardState {
  initialized: boolean;
}

const INITIAL_DASHBOARD_STATE: any = {
  initialized: false
};

export function dashboardStateReducers() {
  return function reducer(state: DashboardState = INITIAL_DASHBOARD_STATE,
                          action: Action): DashboardState {

    switch (action.type) {
      case DashboardActions.SETTINGS_MODIFIED:
        return {
          ...state,
          initialized: true
        };
    }

    switch (action.type) {
      case DashboardActions.DASHBOARD_DESTROYED:
        return {
          ...state,
          initialized: false
        };
    }

    return state;
  };
}
