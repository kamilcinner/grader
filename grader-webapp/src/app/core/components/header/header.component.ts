import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isMobile!: boolean;
  @Input() isSidenavOpened!: boolean;

  @Output() isSidenavOpenedChange = new EventEmitter<boolean>();

  toggleSidenav(): void {
    this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
  }
}
