import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary/diary.component';
import { DiaryEntryComponent } from './components/diary-entry/diary-entry.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';
import { YearCalendarComponent } from './components/year-calendar/year-calendar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DiaryComponent,
    DiaryEntryComponent,
    NewEntryComponent,
    WeekCalendarComponent,
    YearCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DiaryRoutingModule,
    SharedModule
  ]
})
export class DiaryModule { }