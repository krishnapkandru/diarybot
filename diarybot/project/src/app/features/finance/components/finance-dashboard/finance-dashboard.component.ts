import { Component } from '@angular/core';

@Component({
  selector: 'app-finance-dashboard',
  template: `
    <div class="finance-container">
      <h2>Welcome to Finance</h2>
      <div class="finance-content">
        <div class="summary-cards">
          <div class="card">
            <h3>Total Balance</h3>
            <p class="amount">$0.00</p>
          </div>
          <div class="card">
            <h3>Income</h3>
            <p class="amount positive">$0.00</p>
          </div>
          <div class="card">
            <h3>Expenses</h3>
            <p class="amount negative">$0.00</p>
          </div>
        </div>
        <div class="actions">
          <button class="action-btn">Add Transaction</button>
          <button class="action-btn">View Reports</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .finance-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .finance-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .card {
      padding: 20px;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
    }
    .card h3 {
      margin-bottom: 10px;
      color: #495057;
      font-size: 1.1em;
    }
    .amount {
      font-size: 1.8em;
      font-weight: bold;
      color: #212529;
    }
    .positive { color: #28a745; }
    .negative { color: #dc3545; }
    .actions {
      display: flex;
      gap: 10px;
    }
    .action-btn {
      padding: 10px 20px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .action-btn:hover {
      background: #1565c0;
    }
  `]
})
export class FinanceDashboardComponent {}