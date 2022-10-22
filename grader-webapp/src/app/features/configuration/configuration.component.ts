import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { GradeModel } from './models/grade.model';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Select, Store } from '@ngxs/store';
import { GradesState } from './state/grades.state';
import { Grades } from './state/grades.actions';
import { UpdateGradeDto } from './dto/update-grade.dto';

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
    if (!this.selectedGrade) {
      this.store.dispatch(new Grades.Create(createGradeDto));
      return;
    }

    const updateGradeDto: UpdateGradeDto = this.filterSameValues(createGradeDto);
    this.store.dispatch(new Grades.Update(this.selectedGrade.id, updateGradeDto));
  }

  private getAllGrades(): void {
    this.store.dispatch(new Grades.GetAll());
  }

  private filterSameValues(createGradeDto: CreateGradeDto): UpdateGradeDto {
    return Object.fromEntries(
      Object.entries(createGradeDto).filter(([key, value]) => value !== this.selectedGrade?.[key as keyof GradeModel]),
    );
  }
}
