import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-auth-wrapper',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        <app-login *ngIf="isLogin"></app-login>
        <app-register *ngIf="!isLogin"></app-register>
        <p class="toggle-text">
          {{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}
          <button (click)="toggleView()">
            {{ isLogin ? 'Register' : 'Login' }}
          </button>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f5f5;
      padding: 20px;
    }
    .auth-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    .toggle-text {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }
    button {
      background: none;
      border: none;
      color: #1976d2;
      cursor: pointer;
      padding: 0;
      margin-left: 0.5rem;
      font-size: inherit;
    }
    button:hover {
      text-decoration: underline;
    }
  `]
})
export class AuthWrapperComponent {
  isLogin = true;

  toggleView() {
    this.isLogin = !this.isLogin;
  }
}