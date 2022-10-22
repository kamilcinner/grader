import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
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
  @Select(GradesState.grades)
  private readonly grades$!: Observable<GradeModel[]>;
  @Select(GradesState.selectedGrade)
  private readonly selectedGrade$!: Observable<GradeModel | undefined>;

  readonly vm$ = combineLatest([this.grades$, this.selectedGrade$]).pipe(
    map(([grades, selectedGrade]) => ({ grades, selectedGrade })),
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.getAllGrades();
  }

  saveGrade(createGradeDto: CreateGradeDto): void {
    this.store.dispatch(new Grades.Save(createGradeDto));
  }

  onSelectedGradeChange(selectedGrade: GradeModel): void {
    this.store.dispatch(new Grades.Select(selectedGrade));
  }

  onUnselectGrade(): void {
    this.store.dispatch(new Grades.Unselect());
  }

  onDeleteGradeById(gradeId: string): void {
    this.store.dispatch(new Grades.Delete(gradeId));
  }

  private getAllGrades(): void {
    this.store.dispatch(new Grades.GetAll());
  }
}
