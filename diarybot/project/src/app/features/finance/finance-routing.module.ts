import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceDashboardComponent } from './components/finance-dashboard/finance-dashboard.component';

const routes: Routes = [
  { path: '', component: FinanceDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }