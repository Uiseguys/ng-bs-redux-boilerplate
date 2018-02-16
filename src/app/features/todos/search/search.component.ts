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

    // @select([featureId, 'collection']) collection$;
    @select([featureId, 'tags']) tags$;
    @select([featureId, 'selectedTags']) selectedTags$;


    ngOnInit() {
        console.log('subscribed on tags: ', this.tags$);
        console.log('on Search todo component init');

        setTimeout(() =>
            this.toDoActions.addTag('private'),
            3000
        );
        setTimeout(() =>
            this.toDoActions.addTag('movies'),
            5000
        );
        setTimeout(() =>
            this.toDoActions.addTag('books'),
            7000
        );

        setTimeout(() =>
            this.toDoActions.removeTag('movies'),
            9000
        );


        setTimeout(() =>
            this.toDoActions.resetTags(),
            11000
        );







    }

}
