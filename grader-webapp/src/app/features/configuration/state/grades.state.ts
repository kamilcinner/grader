import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GradeModel } from '../models/grade.model';
import { Grades } from './grades.actions';
import { ConfigurationService } from '../configuration.service';
import { EMPTY, switchMap, tap } from 'rxjs';
import { UpdateGradeDto } from '../dto/update-grade.dto';
import { compose, insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { sortItems } from '@shared/state/operators';

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
  getAll({ patchState }: StateContext<GradesStateModel>) {
    return this.configurationService.getAllGrades().pipe(
      tap((grades) => {
        patchState({ grades: grades.sort(GradesState.sortGrades) });
      }),
    );
  }

  @Action(Grades.Select)
  select({ getState, patchState }: StateContext<GradesStateModel>, { selectedGrade }: Grades.Select) {
    const state = getState();
    const selectedGradeIndex = state.grades.indexOf(selectedGrade);
    const selectedGradeMaxPercentage = (state.grades[selectedGradeIndex + 1]?.minPercentage ?? 101) - 1;
    patchState({ selected: { grade: selectedGrade, maxPercentage: selectedGradeMaxPercentage } });
  }

  @Action(Grades.Unselect)
  unselect({ patchState }: StateContext<GradesStateModel>) {
    patchState({ selected: undefined });
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
  create({ setState, dispatch }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Create) {
    return this.configurationService.createGrade(createGradeDto).pipe(
      tap((createdGrade) => {
        setState(
          patch<GradesStateModel>({
            grades: compose(insertItem(createdGrade), sortItems(GradesState.sortGrades)),
          }),
        );
      }),
      switchMap((createdGrade) => dispatch(new Grades.Select(createdGrade))),
    );
  }

  @Action(Grades.Update)
  update({ setState, dispatch }: StateContext<GradesStateModel>, { gradeId, updateGradeDto }: Grades.Update) {
    return this.configurationService.updateGrade(gradeId, updateGradeDto).pipe(
      tap((updatedGrade) => {
        setState(
          patch<GradesStateModel>({
            grades: compose(
              updateItem((grade) => grade?.id === gradeId, updatedGrade),
              sortItems(GradesState.sortGrades),
            ),
          }),
        );
      }),
      switchMap((updatedGrade) => dispatch(new Grades.Select(updatedGrade))),
    );
  }

  @Action(Grades.Delete)
  delete({ getState, setState, dispatch }: StateContext<GradesStateModel>, { gradeId }: Grades.Delete) {
    return this.configurationService.deleteGrade(gradeId).pipe(
      tap(() => {
        setState(
          patch<GradesStateModel>({
            grades: removeItem((grade) => grade?.id === gradeId),
          }),
        );
      }),
      switchMap(() => (getState().selected?.grade.id === gradeId ? dispatch(new Grades.Unselect()) : EMPTY)),
    );
  }
}
