import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { AboutComponent } from './about/about.component';
import { LocalSettingsComponent } from './local-settings/local-settings.component';
import { NavigationModule } from '../shared/navigation/navigation.module';
import { I18NextFormatPipe } from '../shared/i18n/i18next.pipe';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ToDosModule } from '../features/todos/todos.module';
import { ToDosViewComponent } from './todos/view.component';
import { LocalSettingsActions } from './local-settings/api/actions';

@NgModule({
  imports: [
    // features
    ToDosModule,

    // app modules
    DashboardModule,
    NavigationModule,

    // common / shared modules
    SharedModule,
    CommonModule,
  ],
  declarations: [
    AboutComponent,
    LocalSettingsComponent,
    ToDosViewComponent,
    I18NextFormatPipe,
  ],
  exports: [
    DashboardModule,
    AboutComponent,
    LocalSettingsComponent,
    I18NextFormatPipe,
    ToDosViewComponent,
  ],
  providers: [
    LocalSettingsActions,
  ]
})
export class ViewsModule { }
