import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TodoDashboardComponent } from './components/todo-dashboard/todo-dashboard.component';

@NgModule({
  declarations: [
    TodoDashboardComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }