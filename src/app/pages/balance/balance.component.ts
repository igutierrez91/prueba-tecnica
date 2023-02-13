import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Debt } from 'src/app/models/debt';
import { Transaction } from 'src/app/models/transaction';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  public balance!:  any;
  debts!: Debt [];

  constructor(private expensesService: ExpensesService) {
    
  }
  ngOnInit(): void {
    forkJoin([this.expensesService.getBalance(), this.expensesService.getDebts()])
    .subscribe((data) => {
      console.log(data)
      this.balance = data[0];
      this.debts = data[1];
    })
  }

}
