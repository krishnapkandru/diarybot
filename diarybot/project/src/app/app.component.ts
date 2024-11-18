import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-header *ngIf="isLoggedIn"></app-header>
      <div class="main-container" [class.with-header]="isLoggedIn">
        <app-sidebar *ngIf="isLoggedIn"></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main-container {
      display: flex;
      flex: 1;
      &.with-header {
        height: calc(100vh - 64px);
      }
    }
    .content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return !!this.authService.currentUserValue?.token;
  }
}