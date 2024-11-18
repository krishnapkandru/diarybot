import { Component } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  template: `
    <div class="week-calendar">
      <div class="calendar-header">
        <button (click)="previousWeek()">&lt;</button>
        <span>{{ currentWeek }}</span>
        <button (click)="nextWeek()">&gt;</button>
      </div>
      <div class="calendar-days">
        <div *ngFor="let day of weekDays" class="day">
          <span class="day-name">{{ day.name }}</span>
          <span class="day-date">{{ day.date }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .week-calendar {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 20px 0;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    .day {
      text-align: center;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
    }
    .day-name {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
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
export class WeekCalendarComponent {
  currentWeek = 'Week of May 1, 2024';
  weekDays = [
    { name: 'Mon', date: '1' },
    { name: 'Tue', date: '2' },
    { name: 'Wed', date: '3' },
    { name: 'Thu', date: '4' },
    { name: 'Fri', date: '5' },
    { name: 'Sat', date: '6' },
    { name: 'Sun', date: '7' }
  ];

  previousWeek() {
    // Implement previous week logic
  }

  nextWeek() {
    // Implement next week logic
  }
}