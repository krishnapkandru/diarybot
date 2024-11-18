import { Component, OnInit } from '@angular/core';
import { DiaryService, DiaryEntry } from '../../../services/diary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diary',
  template: `
    <div class="diary-container">
      <app-new-entry (entryAdded)="onEntryAdded($event)"></app-new-entry>
      <app-week-calendar></app-week-calendar>
      <div class="entries-list">
        <app-diary-entry 
          *ngFor="let entry of entries$ | async" 
          [entry]="entry">
        </app-diary-entry>
      </div>
    </div>
  `,
  styles: [`
    .diary-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .entries-list {
      margin-top: 20px;
    }
  `]
})
export class DiaryComponent implements OnInit {
  entries$: Observable<DiaryEntry[]>;

  constructor(private diaryService: DiaryService) {
    this.entries$ = this.diaryService.getEntries();
  }

  ngOnInit() {}

  onEntryAdded(entry: Omit<DiaryEntry, 'id'>) {
    this.diaryService.addEntry(entry);
  }
}