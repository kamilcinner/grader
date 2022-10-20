import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, NavComponent, MainComponent],
  imports: [SharedModule],
})
export class LayoutModule {}
