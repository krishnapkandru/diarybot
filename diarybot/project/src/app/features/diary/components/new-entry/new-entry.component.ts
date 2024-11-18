import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiaryEntry } from '../../../../services/diary.service';

@Component({
  selector: 'app-new-entry',
  template: `
    <div class="new-entry-form">
      <form [formGroup]="entryForm" (ngSubmit)="onSubmit()">
        <textarea
          formControlName="content"
          placeholder="Write your diary entry here..."
          rows="5"
        ></textarea>
        <div class="form-controls">
          <select formControlName="mood">
            <option value="">Select mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="neutral">Neutral</option>
          </select>
          <button type="submit" [disabled]="!entryForm.valid">Save Entry</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .new-entry-form {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .form-controls {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background: #cccccc;
    }
  `]
})
export class NewEntryComponent {
  @Output() entryAdded = new EventEmitter<Omit<DiaryEntry, 'id'>>();
  entryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.entryForm = this.fb.group({
      content: ['', Validators.required],
      mood: ['']
    });
  }

  onSubmit() {
    if (this.entryForm.valid) {
      const entry = {
        content: this.entryForm.value.content,
        mood: this.entryForm.value.mood,
        date: new Date(),
        tags: []
      };
      this.entryAdded.emit(entry);
      this.entryForm.reset();
    }
  }
}