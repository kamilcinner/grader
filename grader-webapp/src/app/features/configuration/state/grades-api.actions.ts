import { GradeModel } from '../models/grade.model';

export namespace GradesApi {
  export class GetAllSuccess {
    static readonly type = '[Grades API] GetAllSuccess';
    constructor(public grades: GradeModel[]) {}
  }

  export class GetAllFailed {
    static readonly type = '[Grades API] GetAllFailed';
    constructor(public error: Error) {}
  }

  export class CreateSuccess {
    static readonly type = '[Grades API] CreateSuccess';
    constructor(public createdGrade: GradeModel) {}
  }

  export class CreateFailed {
    static readonly type = '[Grades API] CreateFailed';
    constructor(public error: Error) {}
  }

  export class UpdateSuccess {
    static readonly type = '[Grades API] UpdateSuccess';
    constructor(public updatedGrade: GradeModel) {}
  }

  export class UpdateFailed {
    static readonly type = '[Grades API] UpdateFailed';
    constructor(public error: Error) {}
  }

  export class DeleteSuccess {
    static readonly type = '[Grades API] DeleteSuccess';
    constructor(public gradeId: string) {}
  }

  export class DeleteFailed {
    static readonly type = '[Grades API] DeleteFailed';
    constructor(public error: Error) {}
  }
}
