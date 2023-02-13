import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

display: BehaviorSubject<string> = new BehaviorSubject('close');
​
  watch(): Observable<string> {
    return this.display.asObservable();
  }
​
  open(): void {
    this.display.next('open');
  }
​
  close() {
    this.display.next('close');
  }

  constructor() { }
}
