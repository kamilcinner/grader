import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GradeModel } from '../models/grade.model';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesListComponent {
  @Input() grades!: GradeModel[];
  @Input() selectedGrade?: GradeModel;

  @Output() selectedGradeChange = new EventEmitter<GradeModel>();
  @Output() unselectGrade = new EventEmitter<void>();

  onClickGrade(grade: GradeModel): void {
    this.selectedGradeChange.emit(grade);
  }

  isGradeSelected(grade: GradeModel): boolean {
    return this.selectedGrade === grade;
  }

  onClickAdd(): void {
    this.unselectGrade.emit();
  }
}
