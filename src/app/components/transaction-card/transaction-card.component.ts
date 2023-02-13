import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {

  @Input() transaction!: Transaction;

  constructor() {

  }
}
