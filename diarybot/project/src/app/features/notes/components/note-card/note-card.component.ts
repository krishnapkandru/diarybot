import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-card',
  template: `
    <div class="note-card" *ngIf="note">
      <div class="note-header">
        <h3>{{ note.title }}</h3>
        <div class="actions">
          <button (click)="onEdit()">Edit</button>
          <button (click)="onDelete()">Delete</button>
        </div>
      </div>
      <div class="note-content" [innerHTML]="note.content | markdown"></div>
      <div class="note-tags" *ngIf="note.tags?.length">
        <span class="tag" *ngFor="let tag of note.tags">{{ tag }}</span>
      </div>
    </div>
  `,
  styles: [`
    .note-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .actions {
      display: flex;
      gap: 5px;
    }
    .note-content {
      margin-bottom: 10px;
    }
    .note-tags {
      display: flex;
      gap: 5px;
    }
    .tag {
      background: #e0e0e0;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8em;
    }
    button {
      padding: 5px 10px;
      background: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class NoteCardComponent {
  @Input() note?: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    if (this.note) {
      this.edit.emit(this.note);
    }
  }

  onDelete() {
    if (this.note) {
      this.delete.emit(this.note.id);
    }
  }
}