import { ToDoActions } from './actions';

export interface ToDosState {
  initialized: boolean;
  collection: any;
  currentToDo: any;
  selectedTags: string[];
  tags: string[];
}

const INITIAL_TODOS_STATE: any = {
  initialized: false,
  selectedTags: [
    'work',
    'books',
    'movies',
    'private'
  ]
};

export function todosStateReducers() {
  return function reducer(state: ToDosState = INITIAL_TODOS_STATE,
    action: any): ToDosState {

    switch (action.type) {
      case ToDoActions.OVERVIEW_ACTIVATED:
        return {
          ...state,
          initialized: true
        };
    }

    switch (action.type) {
      case ToDoActions.COLLECTION_DATA_RECEIVED:
        return {
          ...state,
          collection: action.payload
        };
    }

    switch (action.type) {
      case ToDoActions.DETAIL_DATA_RECEIVED:
        return {
          ...state,
          currentToDo: action.payload
        };
    }

    return state;
  };
}
