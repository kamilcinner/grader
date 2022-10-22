import { GradeModel } from '../models/grade.model';

export type CreateGradeDto = Omit<GradeModel, 'id'>;
