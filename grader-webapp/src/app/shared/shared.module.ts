import { NgModule } from '@angular/core';
import { SharedLibraryModule } from '@shared/shared-library.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedPipesModule } from '@shared/pipes/shared-pipes.module';

@NgModule({
  exports: [SharedLibraryModule, SharedComponentsModule, SharedPipesModule],
})
export class SharedModule {}
