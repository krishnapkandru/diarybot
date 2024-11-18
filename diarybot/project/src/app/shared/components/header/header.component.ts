import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="logo">DiaryBot</div>
      <nav>
        <button (click)="logout()">Logout</button>
      </nav>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: 64px;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }
    nav button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background: #f44336;
      color: white;
      cursor: pointer;
    }
    nav button:hover {
      background: #d32f2f;
    }
  `]
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}