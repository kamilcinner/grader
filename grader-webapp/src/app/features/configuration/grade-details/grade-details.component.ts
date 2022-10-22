import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GradeModel } from '../models/grade.model';

type GradeFormConfig = {
  minPercentage: number | null;
  maxPercentage: number | null;
  symbolicGrade: string | null;
  descriptiveGrade: string | null;
};

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeDetailsComponent {
  @Input() set grade(grade: GradeModel | undefined) {
    if (!grade) {
      this.form.reset();
      return;
    }

    this.form.patchValue(grade);
  }

  readonly form;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm() {
    return this.fb.group<GradeFormConfig>({
      minPercentage: null,
      maxPercentage: null,
      symbolicGrade: null,
      descriptiveGrade: null,
    });
  }
}
