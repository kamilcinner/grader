import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

type GradeFormConfig = {
  minPercentage: string | null;
  maxPercentage: string | null;
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
  vm = 123;

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
