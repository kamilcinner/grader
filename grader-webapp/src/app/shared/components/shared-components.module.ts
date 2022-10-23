import { NgModule } from '@angular/core';
import { SharedLibraryModule } from '@shared/shared-library.module';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [SharedLibraryModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class SharedComponentsModule {}
