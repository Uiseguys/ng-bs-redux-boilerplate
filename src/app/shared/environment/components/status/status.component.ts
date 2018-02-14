import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EnvironmentActions } from '../../api/actions';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  isConnected: Observable<boolean>;
  isDismiss: boolean;

  constructor(private dispatcher: EnvironmentActions) {
    this.isConnected = Observable.merge(
        Observable.of(navigator.onLine),
        Observable.fromEvent(window, 'online').map( () => true),
        Observable.fromEvent(window, 'offline').map(() => false));
      this.isConnected.subscribe((flag) => {
          this.dispatcher.isConnected(flag);
          this.isDismiss = !flag;
      });
  }
    onToggleVisibility(event: CustomEvent) {
        console.log(event);
        this.isDismiss = !event;
    }
  hideWarning() {
      this.isDismiss = false;
  }
}
