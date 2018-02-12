import {EnvironmentActions} from './actions';

export interface EnvironmentState {
    connected: boolean;
}

const INITIAL_ENVIRONMENT_STATE: any = {
    connected: true
};

export function environmentStateReducers() {
    return function reducer(state: EnvironmentState = INITIAL_ENVIRONMENT_STATE,
                            action: any): EnvironmentState {
        switch (action.type) {
            case EnvironmentActions.ENVIRONMENT_CONNECTED:
                return {
                    ...state,
                    connected: action.payload
                };
        }

        return state;
    };
}
