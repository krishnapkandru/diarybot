import { Component, Input } from '@angular/core';
import { DiaryEntry } from '../../../../services/diary.service';

@Component({
  selector: 'app-diary-entry',
  template: `
    <div class="entry-card" *ngIf="entry">
      <div class="entry-header">
        <span class="date">{{ entry.date | date:'medium' }}</span>
        <span class="mood" *ngIf="entry.mood">{{ entry.mood }}</span>
      </div>
      <div class="entry-content">{{ entry.content }}</div>
      <div class="entry-tags" *ngIf="entry.tags?.length">
        <span class="tag" *ngFor="let tag of entry.tags">{{ tag }}</span>
      </div>
    </div>
  `,
  styles: [`
    .entry-card {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #666;
      font-size: 0.9em;
    }
    .entry-content {
      white-space: pre-wrap;
    }
    .entry-tags {
      margin-top: 10px;
    }
    .tag {
      background: #e0e0e0;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      margin-right: 5px;
    }
  `]
})
export class DiaryEntryComponent {
  @Input() entry?: DiaryEntry;
}