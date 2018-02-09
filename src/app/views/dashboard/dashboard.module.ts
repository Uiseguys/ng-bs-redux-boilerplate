import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '../../shared/store/store.module';
import { DashbaordComponent } from './dashboard.component';
import { DashboardSettingsComponent } from './components/dashboard-settings.component';
import { DashboardActions } from './api/actions';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const id = 'dashboard';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    DashbaordComponent,
    DashboardSettingsComponent,
  ],
  providers: [
    DashboardActions
  ],
  exports: [
    DashbaordComponent,
    DashboardSettingsComponent,
  ]
})
export class DashboardModule {}
