import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { Balance } from '../models/balance';
import { Debt } from '../models/debt';
import { Member } from '../models/member';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  transactions: Transaction[] = [];
  members: Member[] = [];

  constructor() {
    this.transactions = this.mockTransactions();
    this.members = this.mockMembers();
  }

  getAllTransactions(): Observable<Transaction[]> {
    return of(this.transactions).pipe(
      map(data => data
      .filter(t => t.amount > 0))
    )
  }

  getAllMembers(): Observable<Member[]> {
    return of(this.members);
  }

  getBalancePerUser(): Observable<Balance []> {
    const globalAmount = this.getGlobalAmount(this.transactions);
    const paidForMember = this.getPaidForMember(globalAmount, this.members.length);
    let grouped = this.transactions.reduce(this.groupByIdPayer, []).map((t) => {
      return {
        ...t,
        balance: t.amount - paidForMember,
        totalExpense: t.amount,
      };
    });
    return of(grouped);
  }

  getDebts(balance: Balance[]) {
    const debts = this.calculateDebts(balance);
    return of(debts)
  }

  getGlobalAmount(transaction: Transaction []) {
    return transaction.map((t: Transaction) => t.amount)
    .reduce((acc, current) => acc + current);
  }

  getPaidForMember(globalAmount: number, numMembers: number) {
    return globalAmount / numMembers;
  }

  postTransaction(transaction: Transaction) {
    //Aqui tendria que ir una llamada al servidor, para la prueba la introducimos en el array ya existente
    this.transactions.push(transaction);
  }

  postMember(member: Member) {
    //Aqui tendria que ir una llamada al servidor, para la prueba la introducimos en el array ya existente
    this.members.push(member);
    this.transactions.push({
      amount: 0,
      description: 'Inicial',
      date: '',
      id: Math.max(...this.transactions.map(o => o.id)) + 1,
      idPayer: member.id,
      name: member.name
    })
  }

  groupByIdPayer(newArr: any[], line: any) {
    const { idPayer, name, surname, amount } = line;
    const payerTotal: any = newArr.find(
      (item: any) => item.idPayer === idPayer
    );
    if (payerTotal) {
      payerTotal.amount = payerTotal.amount + amount;
    } else {
      const newPayerTotal = { idPayer, name, surname, amount };
      newArr.push(newPayerTotal);
    }
    return newArr;
  }

  calculateDebts(balance: Balance[]): Debt [] {
    let debtors = balance.filter((b) => b.balance < 0).map((b) => { return {...b}});
    let creditors = balance.filter((b) => b.balance > 0).map((b) => { return {...b}});
    let debts: Debt [] = [];
    debtors.forEach(debtor => {
      creditors.forEach(creditor => {
        const debt = -debtor.balance;
        if (debt > 0) {
          const payment = Math.min(debt, creditor.balance);
          const debtElement: Debt = {
            from: debtor.name,
            to: creditor.name,
            amount: payment
          }
          debts.push(debtElement);
          debtor.balance += payment;
          creditor.balance -= payment;
        }
      });
    });
    return debts;
  }

  mockTransactions(): Transaction[] {
    return [
      {
        amount: 50,
        date: '08/02/2023',
        id: 1,
        idPayer: 1,
        description: 'Hotel',
        name: 'Francisco Buyo Gomez',
      },
      {
        amount: 10,
        date: '10/02/2023',
        id: 2,
        idPayer: 2,
        description: 'Cena 1',
        name: 'Alfonso Pérez Coomonte',
      },
      {
        amount: 50,
        date: '08/01/2023',
        id: 3,
        idPayer: 1,
        description: 'Cena 2',
        name: 'Francisco Buyo Gomez',
      },
      {
        amount: 10,
        date: '08/01/2023',
        id: 4,
        idPayer: 3,
        description: 'Compra básica',
        name: 'Israel Gutierrez',
      },
    ];
  }

  mockMembers(): Member[] {
    return [
      {
        registerDate: '08/02/2023',
        id: 1,
        name: 'Francisco Buyo Gomez',
      },
      {
        registerDate: '10/02/2023',
        id: 2,
        name: 'Alfonso Pérez Coomonte',
      },
      {
        registerDate: '08/01/2023',
        id: 3,
        name: 'Israel Gutierrez',
      },
    ];
  }
}