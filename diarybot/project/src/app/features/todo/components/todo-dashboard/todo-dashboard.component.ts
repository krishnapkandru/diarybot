import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-dashboard',
  template: `
    <div class="todo-container">
      <h2>Welcome to Todo</h2>
      <div class="todo-content">
        <p>Start managing your tasks here!</p>
        <button class="add-task-btn">Add New Task</button>
      </div>
    </div>
  `,
  styles: [`
    .todo-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .todo-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    p {
      margin-bottom: 20px;
      color: #666;
    }
    .add-task-btn {
      padding: 10px 20px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .add-task-btn:hover {
      background: #1565c0;
    }
  `]
})
export class TodoDashboardComponent {}