import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatRippleModule, MatButtonModule],
})
export class SharedMaterialModule {}
