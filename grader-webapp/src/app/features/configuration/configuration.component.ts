import { Component } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { combineLatest, map } from 'rxjs';
import { GradeModel } from './models/grade.model';
import { CreateGradeDto } from './dto/create-grade.dto';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  readonly vm$ = combineLatest([this.configurationService.getAllGrades()]).pipe(map(([grades]) => ({ grades })));
  selectedGrade?: GradeModel;

  constructor(private readonly configurationService: ConfigurationService) {}

  saveGrade(createGradeDto: CreateGradeDto): void {
    if (this.selectedGrade) {
      this.configurationService.updateGrade(this.selectedGrade.id, createGradeDto).subscribe();
      return;
    }
    this.configurationService.createGrade(createGradeDto).subscribe();
  }
}
