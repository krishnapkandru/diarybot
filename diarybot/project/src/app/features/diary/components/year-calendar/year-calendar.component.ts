import { Component } from '@angular/core';

@Component({
  selector: 'app-year-calendar',
  template: `
    <div class="year-calendar">
      <div class="calendar-header">
        <button (click)="previousYear()">&lt;</button>
        <span>{{ currentYear }}</span>
        <button (click)="nextYear()">&gt;</button>
      </div>
      <div class="months-grid">
        <div *ngFor="let month of months" class="month">
          <h3>{{ month.name }}</h3>
          <div class="days-grid">
            <div *ngFor="let day of month.days" class="day">
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .year-calendar {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .months-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .month {
      h3 {
        margin-bottom: 10px;
      }
    }
    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      font-size: 0.8em;
    }
    .day {
      text-align: center;
      padding: 2px;
    }
    button {
      padding: 5px 10px;
      border: none;
      background: #f0f0f0;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class YearCalendarComponent {
  currentYear = 2024;
  months = [
    { name: 'January', days: Array.from({length: 31}, (_, i) => i + 1) },
    { name: 'February', days: Array.from({length: 29}, (_, i) => i + 1) },
    { name: 'March', days: Array.from({length: 31}, (_, i) => i + 1) },
    // ... Add remaining months
  ];

  previousYear() {
    this.currentYear--;
  }

  nextYear() {
    this.currentYear++;
  }
}