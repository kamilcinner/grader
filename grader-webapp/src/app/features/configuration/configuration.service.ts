import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GradeModel } from './models/grade.model';
import { FeatureUrl } from '@shared/enums';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class ConfigurationService extends HttpService {
  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  getAllGrades(): Observable<GradeModel[]> {
    return this.get<GradeModel[]>(FeatureUrl.GRADES);
  }

  getOneGrade(gradeId: string): Observable<GradeModel> {
    return this.get<GradeModel>(`${FeatureUrl.GRADES}/${gradeId}`);
  }

  createGrade(grade: CreateGradeDto): Observable<GradeModel> {
    return this.post<GradeModel>(`${FeatureUrl.GRADES}`, grade);
  }

  updateGrade(gradeId: string, grade: UpdateGradeDto): Observable<GradeModel> {
    return this.patch<GradeModel>(`${FeatureUrl.GRADES}/${gradeId}`, grade);
  }

  deleteGrade(gradeId: string): Observable<void> {
    return this.delete<void>(`${FeatureUrl.GRADES}/${gradeId}`);
  }
}
