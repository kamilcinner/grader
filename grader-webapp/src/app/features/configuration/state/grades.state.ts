import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GradeModel } from '../models/grade.model';
import { Grades } from './grades.actions';
import { ConfigurationService } from '../configuration.service';
import { tap } from 'rxjs';

export type GradesStateModel = {
  grades: GradeModel[];
};

const defaults = {
  grades: [],
};

@State<GradesStateModel>({
  name: 'grades',
  defaults,
})
@Injectable()
export class GradesState {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Selector()
  static grades(state: GradesStateModel) {
    return state.grades;
  }

  @Action(Grades.GetAll)
  getAll({ setState }: StateContext<GradesStateModel>) {
    return this.configurationService.getAllGrades().pipe(
      tap((grades) => {
        setState({ grades });
      }),
    );
  }

  @Action(Grades.Create)
  create({ getState, setState }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Create) {
    return this.configurationService.createGrade(createGradeDto).pipe(
      tap((createdGrade) => {
        const state = getState();
        setState({ grades: [...state.grades, createdGrade] });
      }),
    );
  }
}
