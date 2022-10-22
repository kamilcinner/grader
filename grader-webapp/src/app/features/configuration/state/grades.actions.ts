import { CreateGradeDto } from '../dto/create-grade.dto';
import { UpdateGradeDto } from '../dto/update-grade.dto';

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
}
