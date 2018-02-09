import { Action } from 'redux';
import { LocalSettingsActions } from './actions';

export interface LocalSettingsState {
  compactView: boolean;
}

const INITIAL_SETTINGS_STATE: any = {
  compactView: false
};

export function localSettingsReducers() {
  return function reducer(
      state: LocalSettingsState = INITIAL_SETTINGS_STATE,
      action: Action): LocalSettingsState {

    switch (action.type) {
      case LocalSettingsActions.COMPACT_VIEW_ACTIVATED:
        console.log('cea');
        return {
          ...state,
          compactView: true
        };
      case LocalSettingsActions.COMPACT_VIEW_DEACTIVATED:
        return {
          ...state,
          compactView: false
        };
    }

    return state;
  };
}
