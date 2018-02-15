import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { select } from '@angular-redux/store';
import { ToDoActions } from '../api/actions';
import { featureId } from '../index';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    constructor(private toDoActions: ToDoActions) { }

    @select([featureId, 'collection']) collection$;


    ngOnInit() {
        console.log('on Search todo component init');

    }

}
