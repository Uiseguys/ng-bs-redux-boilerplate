import { Component, OnInit } from '@angular/core';
// import { Store } from '@angular-redux/store';
import { dispatch, select } from '@angular-redux/store';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss']
})

export class AsideNavComponent implements OnInit {

  @select() location;
  currentPath: string;
  activeState: String = 'DASHBOARD'; // Set default menu active on load
  constructor() {
  }

  ngOnInit() {
    this.location.subscribe((location) => {
      console.log('location in subscription:');
      console.log(location);
      this.currentPath = location.type;
      this.activeState = this.currentPath && this.currentPath.replace('app/navigation/', '');
    });
  }

  setActiveState(state: String) {
    this.activeState = state;
  }

}
