import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidenavItemModel } from './sidenav-item.model';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemComponent {
  @Input() data!: SidenavItemModel;
}
