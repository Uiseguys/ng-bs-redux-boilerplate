import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const routesMap = {
  'app/navigation/DASHBOARD': '/dashboard',
  'app/navigation/ABOUT': '/about',
  'app/navigation/SETTINGS': '/settings',
  'app/navigation/TODOS': '/todos',
  'app/navigation/TODO_DETAIL': '/todos/:id',  // :id is a dynamic segment (todo id)
};

const reduxTriple = connectRoutes(history, routesMap);

export const navigationReducer = reduxTriple.reducer;
export const navigationMiddleware = reduxTriple.middleware;
export const navigationEnhancer = reduxTriple.enhancer;
