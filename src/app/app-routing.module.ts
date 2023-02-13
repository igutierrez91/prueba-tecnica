import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './pages/balance/balance.component';
import { MembersComponent } from './pages/members/members.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
    { path: '', component: TransactionsComponent },
    { path: 'members', component: MembersComponent },
    { path: 'balance', component: BalanceComponent },
    { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
