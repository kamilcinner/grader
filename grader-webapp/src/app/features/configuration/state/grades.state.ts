import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GradeModel } from '../models/grade.model';
import { Grades } from './grades.actions';
import { ConfigurationService } from '../configuration.service';
import { tap } from 'rxjs';
import { UpdateGradeDto } from '../dto/update-grade.dto';

export type GradesStateModel = {
  grades: GradeModel[];
  selectedGrade?: GradeModel;
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
  @Selector()
  static grades(state: GradesStateModel) {
    return state.grades;
  }

  @Selector()
  static selectedGrade(state: GradesStateModel) {
    return state.selectedGrade;
  }

  static sortGrades(a: GradeModel, b: GradeModel): number {
    if (a.minPercentage < b.minPercentage) {
      return -1;
    }
    if (a.minPercentage > b.minPercentage) {
      return 1;
    }
    return 0;
  }

  constructor(private readonly configurationService: ConfigurationService) {}

  @Action(Grades.GetAll)
  getAll({ getState, setState }: StateContext<GradesStateModel>) {
    return this.configurationService.getAllGrades().pipe(
      tap((grades) => {
        const state = getState();
        setState({ ...state, grades: grades.sort(GradesState.sortGrades) });
      }),
    );
  }

  @Action(Grades.Select)
  select({ getState, setState }: StateContext<GradesStateModel>, { selectedGrade }: Grades.Select) {
    const state = getState();
    setState({ ...state, selectedGrade });
  }

  @Action(Grades.Unselect)
  unselect({ getState, setState }: StateContext<GradesStateModel>) {
    const state = getState();
    setState({ ...state, selectedGrade: undefined });
  }

  @Action(Grades.Save)
  save({ getState, dispatch }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Save) {
    const state = getState();
    if (!state.selectedGrade) {
      return dispatch(new Grades.Create(createGradeDto));
    }

    const updateGradeDto: UpdateGradeDto = Object.fromEntries(
      Object.entries(createGradeDto).filter(([key, value]) => value !== state.selectedGrade?.[key as keyof GradeModel]),
    );
    return dispatch(new Grades.Update(state.selectedGrade.id, updateGradeDto));
  }

  @Action(Grades.Create)
  create({ getState, setState }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Create) {
    return this.configurationService.createGrade(createGradeDto).pipe(
      tap((createdGrade) => {
        const state = getState();
        const grades = [...state.grades, createdGrade].sort(GradesState.sortGrades);
        setState({ ...state, grades, selectedGrade: createdGrade });
      }),
    );
  }

  @Action(Grades.Update)
  update({ getState, setState }: StateContext<GradesStateModel>, { gradeId, updateGradeDto }: Grades.Update) {
    return this.configurationService.updateGrade(gradeId, updateGradeDto).pipe(
      tap((updatedGrade) => {
        const state = getState();
        const grades = [...state.grades.filter((grade) => grade.id !== gradeId), updatedGrade].sort(
          GradesState.sortGrades,
        );
        setState({ ...state, grades, selectedGrade: updatedGrade });
      }),
    );
  }
}
