import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { GradeModel } from './models/grade.model';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Select, Store } from '@ngxs/store';
import { GradesState, GradesStateModel } from './state/grades.state';
import { Grades } from './state/grades.actions';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  @Select(GradesState.grades)
  private readonly grades$!: Observable<GradeModel[]>;
  @Select(GradesState.selected)
  private readonly selected$!: Observable<GradesStateModel['selected'] | undefined>;

  readonly vm$ = combineLatest([this.grades$, this.selected$]).pipe(
    map(([grades, selected]) => ({ grades, selected })),
  );

  constructor(private readonly store: Store) {}

  onSaveGrade(createGradeDto: CreateGradeDto): void {
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
}
