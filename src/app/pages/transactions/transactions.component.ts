import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Transaction } from 'src/app/models/transaction';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private expensesService: ExpensesService, private modalService: ModalService, private fb: FormBuilder,
  private datePipe: DatePipe) {}

  public transactions: Transaction [] = [];
  public options: any [] = [];
  transactionForm!: FormGroup;
  subscription!: Subscription;  
  ngOnInit(): void {
    this.getTransactions();
    this.expensesService.getAllMembers().subscribe((response) => {
      this.options = response.map((m) => { return {label: m.name, id:m.id}});
    })
  }

  addTransaction() {
    this.modalService.open();
    this.createTransactionForm();
  }

  createTransactionForm() {
    this.transactionForm = this.fb.group({
      member: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  sendTransaction() {
    const value = this.transactionForm.value;
    const nextId = Math.max(...this.transactions.map(o => o.id)) + 1;
    this.expensesService.postTransaction({
      amount: value.amount,
      date: this.datePipe.transform(value.date,'dd/MM/yyyy') || '',
      description: value.description,
      name:value.member.label,
      idPayer:value.member.id,
      id: nextId
    });
    this.modalService.close();
    this.getTransactions();
  }

  getTransactions() {
    this.subscription = this.expensesService.getAllTransactions().subscribe((response) => {
      this.transactions = [...response];
    })
  }


}
