import { Component } from '@angular/core';
import { SidenavItemModel } from './sidenav-item/sidenav-item.model';
import { SIDENAV_CONFIG } from './sidenav-config.constant';

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
