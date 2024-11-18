import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar">
      <ul>
        <li *ngFor="let item of menuItems">
          <a [routerLink]="item.path" routerLinkActive="active">
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: #fff;
      height: 100%;
      border-right: 1px solid #eee;
      padding: 1rem 0;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li a {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      color: #333;
      transition: background-color 0.2s;
    }
    li a:hover {
      background: #f5f5f5;
    }
    li a.active {
      background: #e3f2fd;
      color: #1976d2;
    }
    .icon {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
  `]
})
export class SidebarComponent {
  menuItems = [
    { path: '/diary', icon: '📔', label: 'Diary' },
    { path: '/notes', icon: '📝', label: 'Notes' },
    { path: '/todo', icon: '✓', label: 'Todo' },
    { path: '/finance', icon: '💰', label: 'Finance' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];
}