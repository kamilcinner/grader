import { Component } from '@angular/core';
import { SIDENAV_CONFIG } from './sidenav-config.constant';
import { SidenavItemModel } from './sidenav-item.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  readonly sidenavItems: SidenavItemModel[];

  constructor() {
    this.sidenavItems = [...SIDENAV_CONFIG];
  }
}
