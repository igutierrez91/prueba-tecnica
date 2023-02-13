import { Component } from '@angular/core';
import { Tabs } from './models/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-reto-tecnico';
  tabs: Tabs [] = [{
    name: 'Transacciones',
    route: '/transactions'
  },
  {
    name: 'Miembros',
    route: '/members'
  },
  {
    name: 'Balance',
    route: '/balance'
  }]
}
