import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@shared/shared-material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [CommonModule, SharedMaterialModule, TranslateModule],
})
export class SharedLibraryModule {}
