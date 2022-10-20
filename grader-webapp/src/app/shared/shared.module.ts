import { NgModule } from '@angular/core';
import { SharedLibraryModule } from '@shared/shared-library.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';

@NgModule({
  exports: [SharedLibraryModule, SharedComponentsModule],
})
export class SharedModule {}
