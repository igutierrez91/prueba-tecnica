import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Transaction } from '../models/transaction';

import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllTransactions', () => {
    it('should return an Observable of all transactions', () => {
      const transactions: Transaction [] = [{
        amount: 50,
        date: '08/02/2023',
        id: 1,
        idPayer: 1,
        description: 'some description',
        name: 'Israel Gutierrez'
      }];
      spyOn(service, 'getAllTransactions').and.returnValue(of(transactions));

      service.getAllTransactions().subscribe(res => {
        expect(res).toEqual(transactions);
      });
    });
  });

  describe('getAllMembers', () => {
    it('should return an Observable of all members', () => {
      const members = [{
        id: 1,
        name: 'John',
        surname: 'Doe',
        registerDate: '01/01/2023'
      }];
      spyOn(service, 'getAllMembers').and.returnValue(of(members));

      service.getAllMembers().subscribe(res => {
        expect(res).toEqual(members);
      });
    });
  });
});
