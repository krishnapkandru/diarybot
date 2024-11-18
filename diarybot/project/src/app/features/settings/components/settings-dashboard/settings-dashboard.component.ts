import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-dashboard',
  template: `
    <div class="settings-container">
      <h2>Settings</h2>
      <div class="settings-content">
        <div class="settings-section">
          <h3>Profile Settings</h3>
          <div class="setting-item">
            <label>Display Name</label>
            <input type="text" placeholder="Enter your display name">
          </div>
          <div class="setting-item">
            <label>Email</label>
            <input type="email" placeholder="Enter your email">
          </div>
        </div>

        <div class="settings-section">
          <h3>Preferences</h3>
          <div class="setting-item">
            <label>Theme</label>
            <select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Language</label>
            <select>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        <div class="settings-section">
          <h3>Notifications</h3>
          <div class="setting-item checkbox">
            <label>
              <input type="checkbox">
              Email Notifications
            </label>
          </div>
          <div class="setting-item checkbox">
            <label>
              <input type="checkbox">
              Push Notifications
            </label>
          </div>
        </div>

        <div class="actions">
          <button class="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .settings-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .settings-section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .settings-section:last-child {
      border-bottom: none;
    }
    h3 {
      margin-bottom: 15px;
      color: #444;
    }
    .setting-item {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }
    input[type="text"],
    input[type="email"],
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox label {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .actions {
      margin-top: 20px;
    }
    .save-btn {
      padding: 10px 20px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .save-btn:hover {
      background: #1565c0;
    }
  `]
})
export class SettingsDashboardComponent {}