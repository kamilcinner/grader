import { NgModule } from '@angular/core';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SharedModule } from '@shared/shared.module';
import { ConfigurationService } from './configuration.service';
import { GradesListComponent } from './grades-list/grades-list.component';
import { GradeDetailsComponent } from './grade-details/grade-details.component';
import { NgxsModule } from '@ngxs/store';
import { GradesState } from './state/grades.state';

@NgModule({
  declarations: [ConfigurationComponent, GradesListComponent, GradeDetailsComponent],
  imports: [SharedModule, ConfigurationRoutingModule, NgxsModule.forFeature([GradesState])],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}
