import { CreateGradeDto } from '../dto/create-grade.dto';
import { UpdateGradeDto } from '../dto/update-grade.dto';
import { GradeModel } from '../models/grade.model';

export namespace Grades {
  export class GetAll {
    static readonly type = '[Grades] GetAll';
  }

  export class Create {
    static readonly type = '[Grades] Create';
    constructor(public createGradeDto: CreateGradeDto) {}
  }

  export class Update {
    static readonly type = '[Grades] Update';
    constructor(public gradeId: string, public updateGradeDto: UpdateGradeDto) {}
  }

  export class Select {
    static readonly type = '[Grades] Select';
    constructor(public selectedGrade: GradeModel) {}
  }

  export class Unselect {
    static readonly type = '[Grades] Unselect';
  }

  export class Save {
    static readonly type = '[Grades] Save';
    constructor(public createGradeDto: CreateGradeDto) {}
  }

  export class Delete {
    static readonly type = '[Grades] Delete';
    constructor(public gradeId: string) {}
  }
}
