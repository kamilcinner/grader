import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@shared/shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [CommonModule, RouterModule, SharedMaterialModule, TranslateModule, FormsModule],
})
export class SharedLibraryModule {}
