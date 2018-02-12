import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './components/status/status.component';
import { EnvironmentObservers } from './api/observer';
import { EnvironmentActions } from './api/actions';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ StatusComponent ],
  providers: [ EnvironmentObservers, EnvironmentActions ],
  exports: [ StatusComponent ]
})
export class StatusModule {}
