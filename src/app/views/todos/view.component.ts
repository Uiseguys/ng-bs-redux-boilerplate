import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';

@Component({
  selector: 'app-todos-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ToDosViewComponent implements OnInit {

  @select() location; // select location data from store
  currentPath: string;
  currentToDoId: string;

  @select('location') location$; // select location data from store
  @dispatch() showDetailView = (playlistId) => ({type: 'app/navigation/TODO_DETAIL', payload: {id: playlistId}});

  ngOnInit() {
      this.location.subscribe((location) => {
        console.log('location in subscription:');
        console.log(location);
        this.currentPath = location.type;
        this.currentToDoId = location.payload.id;
      });
  }

}
