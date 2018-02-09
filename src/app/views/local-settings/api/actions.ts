import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';

@Injectable()
export class LocalSettingsActions {
    static readonly SETTINGS_INITIALIZED = 'SETTINGS_INITIALIZED';
    static readonly SETTINGS_LOADED = 'SETTINGS_LOADED';
    static readonly COMPACT_VIEW_ACTIVATED = 'COMPACT_VIEW_ACTIVATED';
    static readonly COMPACT_VIEW_DEACTIVATED = 'COMPACT_VIEW_DEACTIVATED';

    @dispatch()
    public settingsInitialized = (): Action => ({
      type: LocalSettingsActions.SETTINGS_INITIALIZED
    });

    @dispatch()
    public settingsLoaded = (): Action => ({
      type: LocalSettingsActions.SETTINGS_LOADED
    });

    @dispatch()
    public compactViewActivated = (): Action => ({
      type: LocalSettingsActions.COMPACT_VIEW_ACTIVATED
    })

    @dispatch()
    public compactViewDeactivated = (): Action => ({
      type: LocalSettingsActions.COMPACT_VIEW_DEACTIVATED
    })
}
