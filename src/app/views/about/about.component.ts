import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  buildVersion: string;
  content: any = '';

  constructor(private http: HttpClient) {
    this.http
      .get('assets/CHANGELOG.md', { responseType: 'text' })
      .subscribe(res => {
        // remove all links
        const patt = /\(http[^)]*\)/gi;
        this.content = res.toString().replace(patt, '');
      });
  }

  ngOnInit() {
    console.log('AboutComponent initialized.');
    this.buildVersion = environment.version;
  }
}
