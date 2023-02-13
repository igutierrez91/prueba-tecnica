import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuTabsComponent } from './components/menu-tabs/menu-tabs.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MembersComponent } from './pages/members/members.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { BalanceDirective } from './directives/balance.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';

registerLocaleData(localeDe, 'es-ES', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    MenuTabsComponent,
    TransactionsComponent,
    MembersComponent,
    BalanceComponent,
    TransactionCardComponent,
    MemberCardComponent,
    BalanceDirective,
    AutocompleteComponent,
    ModalComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  },
  DatePipe,
  OrderByPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
