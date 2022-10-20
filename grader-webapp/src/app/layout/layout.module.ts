import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '@shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SidenavItemComponent } from './sidenav/sidenav-item/sidenav-item.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, MainComponent, SidenavComponent, SidenavItemComponent],
  imports: [SharedModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
