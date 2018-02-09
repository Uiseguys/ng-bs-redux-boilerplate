import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  buildVersion: string;

  constructor() {}

  ngOnInit() {
    console.log('AboutComponent initialized.');
    this.buildVersion = environment.version;
  }
}
