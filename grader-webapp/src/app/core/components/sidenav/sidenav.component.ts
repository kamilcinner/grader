import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SIDENAV_CONFIG } from './sidenav-config.constant';
import { SidenavItemModel } from './sidenav-item.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Output() itemClick = new EventEmitter<SidenavItemModel>();

  readonly sidenavItems: SidenavItemModel[];

  constructor() {
    this.sidenavItems = [...SIDENAV_CONFIG];
  }

  onItemClick(item: SidenavItemModel): void {
    this.itemClick.emit(item);
  }
}
