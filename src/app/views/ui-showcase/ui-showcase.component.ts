import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-showcase',
    templateUrl: './ui-showcase.component.html',
    styleUrls: ['./ui-showcase.component.scss']
})
export class UIShowcaseComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        console.log('UI Showcase Initialized');
    }
}
