import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsDashboardComponent } from './components/settings-dashboard/settings-dashboard.component';

@NgModule({
  declarations: [
    SettingsDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }