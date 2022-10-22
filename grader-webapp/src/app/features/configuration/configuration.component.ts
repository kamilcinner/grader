import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { GradeModel } from './models/grade.model';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Select, Store } from '@ngxs/store';
import { GradesState } from './state/grades.state';
import { Grades } from './state/grades.actions';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  @Select(GradesState.grades) grades$!: Observable<GradeModel[]>;

  selectedGrade?: GradeModel;

  constructor(private readonly configurationService: ConfigurationService, private readonly store: Store) {}

  ngOnInit(): void {
    this.getAllGrades();
  }

  saveGrade(createGradeDto: CreateGradeDto): void {
    if (this.selectedGrade) {
      this.configurationService.updateGrade(this.selectedGrade.id, createGradeDto).subscribe();
      return;
    }
    this.configurationService.createGrade(createGradeDto).subscribe();
  }

  private getAllGrades(): void {
    this.store.dispatch(Grades.GetAll);
  }
}
