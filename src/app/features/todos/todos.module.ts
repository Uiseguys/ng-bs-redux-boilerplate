import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '../../shared/store/store.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ToDoActions } from './api/actions';
import { SharedModule } from '../../shared/shared.module';
import { PlaylistCollectionComponent } from './collection/collection.component';
import { PlaylistDetailComponent } from './detail/detail.component';

import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    HttpClientModule,
    NavigationModule,
    SharedModule,
  ],
  declarations: [
    PlaylistCollectionComponent,
    PlaylistDetailComponent,

    SearchComponent
  ],
  providers: [
    ToDoActions
  ],
  exports: [
    PlaylistDetailComponent,
    PlaylistCollectionComponent,
    SearchComponent
  ]
})
export class ToDosModule { }
