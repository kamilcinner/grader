import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GradeModel } from '../models/grade.model';
import { Grades } from './grades.actions';
import { ConfigurationService } from '../configuration.service';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { UpdateGradeDto } from '../dto/update-grade.dto';
import { compose, insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { sortItems } from '@shared/state/operators';
import { GradesApi } from './grades-api.actions';
import { ToastrHelper } from '@shared/helpers/toastr.helper';

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

  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly toastrHelper: ToastrHelper,
    private readonly ngZone: NgZone,
  ) {}

  @Action(Grades.GetAll)
  getAll({ dispatch }: StateContext<GradesStateModel>) {
    return this.configurationService.getAllGrades().pipe(
      switchMap((grades) => dispatch(new GradesApi.GetAllSuccess(grades))),
      catchError((err) => dispatch(new GradesApi.GetAllFailed(err))),
    );
  }

  @Action(GradesApi.GetAllSuccess)
  getAllSuccess({ patchState }: StateContext<GradesStateModel>, { grades }: GradesApi.GetAllSuccess) {
    patchState({ grades: grades.sort(GradesState.sortGrades) });
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
    if (Object.keys(updateGradeDto).length) {
      return dispatch(new Grades.Update(state.selected.grade.id, updateGradeDto));
    }

    this.ngZone.run(() => this.toastrHelper.info('configuration.toastr.info.nothingChanged'));
    return EMPTY;
  }

  @Action(Grades.Create)
  create({ dispatch }: StateContext<GradesStateModel>, { createGradeDto }: Grades.Create) {
    return this.configurationService.createGrade(createGradeDto).pipe(
      switchMap((createdGrade) =>
        dispatch(new GradesApi.CreateSuccess(createdGrade)).pipe(
          switchMap(() => dispatch(new Grades.Select(createdGrade))),
        ),
      ),
      catchError((err) => dispatch(new GradesApi.CreateFailed(err))),
    );
  }

  @Action(GradesApi.CreateSuccess)
  createSuccess({ setState }: StateContext<GradesStateModel>, { createdGrade }: GradesApi.CreateSuccess) {
    setState(
      patch<GradesStateModel>({
        grades: compose(insertItem(createdGrade), sortItems(GradesState.sortGrades)),
      }),
    );
  }

  @Action(GradesApi.CreateFailed)
  createFailed(ctx: StateContext<GradesStateModel>, { error }: GradesApi.CreateFailed) {
    this.ngZone.run(() => this.toastrHelper.toastr.error(error.message));
  }

  @Action(Grades.Update)
  update({ dispatch }: StateContext<GradesStateModel>, { gradeId, updateGradeDto }: Grades.Update) {
    return this.configurationService.updateGrade(gradeId, updateGradeDto).pipe(
      switchMap((updatedGrade) =>
        dispatch(new GradesApi.UpdateSuccess(updatedGrade)).pipe(
          switchMap(() => dispatch(new Grades.Select(updatedGrade))),
        ),
      ),
      catchError((err) => dispatch(new GradesApi.UpdateFailed(err))),
    );
  }

  @Action(GradesApi.UpdateSuccess)
  updateSuccess({ setState }: StateContext<GradesStateModel>, { updatedGrade }: GradesApi.UpdateSuccess) {
    setState(
      patch<GradesStateModel>({
        grades: compose(
          updateItem((grade) => grade?.id === updatedGrade.id, updatedGrade),
          sortItems(GradesState.sortGrades),
        ),
      }),
    );
  }

  @Action(GradesApi.UpdateFailed)
  updateFailed(ctx: StateContext<GradesStateModel>, { error }: GradesApi.UpdateFailed) {
    this.ngZone.run(() => this.toastrHelper.toastr.error(error.message));
  }

  @Action(Grades.Delete)
  delete({ getState, dispatch }: StateContext<GradesStateModel>, { gradeId }: Grades.Delete) {
    return this.configurationService.deleteGrade(gradeId).pipe(
      switchMap(() =>
        dispatch(new GradesApi.DeleteSuccess(gradeId)).pipe(
          switchMap(() => (getState().selected?.grade.id === gradeId ? dispatch(new Grades.Unselect()) : EMPTY)),
        ),
      ),
      catchError((err) => dispatch(new GradesApi.DeleteFailed(err))),
    );
  }

  @Action(GradesApi.DeleteSuccess)
  deleteSuccess({ setState }: StateContext<GradesStateModel>, { gradeId }: GradesApi.DeleteSuccess) {
    setState(
      patch<GradesStateModel>({
        grades: removeItem((grade) => grade?.id === gradeId),
      }),
    );
  }

  @Action(GradesApi.DeleteFailed)
  deleteFailed(ctx: StateContext<GradesStateModel>, { error }: GradesApi.DeleteFailed) {
    this.ngZone.run(() => this.toastrHelper.toastr.error(error.message));
  }
}
