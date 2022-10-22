import { CreateGradeDto } from '../dto/create-grade.dto';

export namespace Grades {
  export class GetAll {
    static readonly type = '[Grades] GetAll';
  }

  export class Create {
    static readonly type = '[Grades] Create';
    constructor(public createGradeDto: CreateGradeDto) {}
  }
}
