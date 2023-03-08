import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
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
    this.expensesService.getBalancePerUser().pipe(
      switchMap(b => {
        this.balance = b;
        return this.expensesService.getDebts(b)
      })
    ).subscribe((debts) => {
      this.debts = debts;
    });
  }

}
