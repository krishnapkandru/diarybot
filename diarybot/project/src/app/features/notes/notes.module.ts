import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesDashboardComponent } from './components/notes-dashboard/notes-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    NotesDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotesRoutingModule,
    SharedModule
  ]
})
export class NotesModule { }