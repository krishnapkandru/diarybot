import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DiaryEntry {
  id: string;
  content: string;
  date: Date;
  mood?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private entries: DiaryEntry[] = [];
  private entriesSubject = new BehaviorSubject<DiaryEntry[]>([]);

  constructor() {
    this.loadEntries();
  }

  private loadEntries() {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      this.entries = JSON.parse(savedEntries);
      this.entriesSubject.next(this.entries);
    }
  }

  getEntries(): Observable<DiaryEntry[]> {
    return this.entriesSubject.asObservable();
  }

  addEntry(entry: Omit<DiaryEntry, 'id'>) {
    const newEntry = {
      ...entry,
      id: Date.now().toString()
    };
    this.entries.unshift(newEntry);
    this.saveEntries();
  }

  private saveEntries() {
    localStorage.setItem('diaryEntries', JSON.stringify(this.entries));
    this.entriesSubject.next(this.entries);
  }
}