import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceRoutingModule } from './finance-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FinanceDashboardComponent } from './components/finance-dashboard/finance-dashboard.component';

@NgModule({
  declarations: [
    FinanceDashboardComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule
  ]
})
export class FinanceModule { }