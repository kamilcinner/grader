import { NgModule } from '@angular/core';
import { PercentageRangePipe } from './percentage-range.pipe';
import { SharedLibraryModule } from '@shared/shared-library.module';

@NgModule({
  declarations: [PercentageRangePipe],
  imports: [SharedLibraryModule],
  exports: [PercentageRangePipe],
})
export class SharedPipesModule {}
