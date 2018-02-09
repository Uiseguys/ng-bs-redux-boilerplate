import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { RootReducer } from './reducers';
import { Middlewares } from './middleware';
import { Enhancers } from './enhancers';

import { LocalStorageService } from '../localStorage/localStorage.service'

@NgModule({
  imports: [ NgReduxModule ],
  providers: [ Middlewares, Enhancers ],
})
export class StoreModule {
  constructor( public store: NgRedux<object>, middleware: Middlewares, enhancers: Enhancers, private localStorage: LocalStorageService) {
    store.configureStore( RootReducer, {}, middleware.init(), enhancers.init());
    store.subscribe(() => {
      this.localStorage.saveState(
        'settings',
        store.getState().settings
      );
    });
  }
}
