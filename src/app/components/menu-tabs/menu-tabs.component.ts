import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tabs } from 'src/app/models/tabs';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss']
})
export class MenuTabsComponent {

  @Input() tabs: Tabs [] = [];

  constructor(private router: Router) {}
}
