import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GradeModel } from '../models/grade.model';
import { Grades } from './grades.actions';
import { ConfigurationService } from '../configuration.service';
import { switchMap, tap } from 'rxjs';
import { UpdateGradeDto } from '../dto/update-grade.dto';

export type GradesStateModel = {
  grades: GradeModel[];
  selected?: {
    grade: GradeModel;
    maxPercentage: number;
  };
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
  static selected(state: GradesStateModel) {
    return state.selected;
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
    const selectedGradeIndex = state.grades.indexOf(selectedGrade);
    const selectedGradeMaxPercentage = (state.grades[selectedGradeIndex + 1]?.minPercentage ?? 101) - 1;
    setState({ ...state, selected: { grade: selectedGrade, maxPercentage: selectedGradeMaxPercentage } });
  }

  @Action(Grades.Unselect)
  unselect({ getState, setState }: StateContext<GradesStateModel>) {
    const state = getState();
    setState({ ...state, selected: undefined });
  }

  @Action(Grades.Save)
  save({ getState, dispatch }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Save) {
    const state = getState();
    if (!state.selected) {
      return dispatch(new Grades.Create(createGradeDto));
    }

    const updateGradeDto: UpdateGradeDto = Object.fromEntries(
      Object.entries(createGradeDto).filter(([key, value]) => value !== state.selected?.grade[key as keyof GradeModel]),
    );
    return dispatch(new Grades.Update(state.selected.grade.id, updateGradeDto));
  }

  @Action(Grades.Create)
  create({ getState, setState, dispatch }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Create) {
    return this.configurationService.createGrade(createGradeDto).pipe(
      tap((createdGrade) => {
        const state = getState();
        const grades = [...state.grades, createdGrade].sort(GradesState.sortGrades);
        setState({ ...state, grades });
      }),
      switchMap((createdGrade) => dispatch(new Grades.Select(createdGrade))),
    );
  }

  @Action(Grades.Update)
  update({ getState, setState, dispatch }: StateContext<GradesStateModel>, { gradeId, updateGradeDto }: Grades.Update) {
    return this.configurationService.updateGrade(gradeId, updateGradeDto).pipe(
      tap((updatedGrade) => {
        const state = getState();
        const grades = [...state.grades.filter((grade) => grade.id !== gradeId), updatedGrade].sort(
          GradesState.sortGrades,
        );
        setState({ ...state, grades });
      }),
      switchMap((updatedGrade) => dispatch(new Grades.Select(updatedGrade))),
    );
  }

  @Action(Grades.Delete)
  delete({ getState, setState, dispatch }: StateContext<GradesStateModel>, { gradeId }: Grades.Delete) {
    return this.configurationService.deleteGrade(gradeId).pipe(
      tap(() => {
        const state = getState();
        const grades = state.grades.filter((grade) => grade.id !== gradeId);
        setState({ ...state, grades });
        if (state.selected?.grade.id === gradeId) {
          dispatch(new Grades.Unselect());
        }
      }),
    );
  }
}
