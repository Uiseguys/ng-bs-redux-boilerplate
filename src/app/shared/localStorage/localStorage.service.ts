import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public loadState(key: string) {
      try {
          const serializedState = localStorage.getItem(key);
          if (serializedState === null) {
              return undefined;
          }
          return JSON.parse(serializedState);
      } catch (err) {
          return undefined;
      }
  };

  public saveState(key: string, state: any) {
      try {
          const serializedState = JSON.stringify(state);
          localStorage.setItem(key, serializedState);
      } catch (err) {
          console.log(err);
      }
  };
}
