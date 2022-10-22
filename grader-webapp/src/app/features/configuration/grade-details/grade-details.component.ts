import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GradeModel } from '../models/grade.model';
import { ObjectUtils } from '@shared/utils/object.utils';
import { CreateGradeDto } from '../dto/create-grade.dto';
import { DeepNullable } from 'ts-essentials';
import { ToastrHelper } from '@shared/helpers/toastr.helper';

type GradeFormValueModel = DeepNullable<{
  minPercentage: number;
  symbolicGrade: string;
  descriptiveGrade: string;
}>;

type GradeForm = FormGroup<{ [FieldName in keyof GradeFormValueModel]: FormControl<GradeFormValueModel[FieldName]> }>;

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

  @Input() set maxPercentage(maxPercentage: number | undefined) {
    if (maxPercentage === undefined) {
      this.maxPercentageControl.reset();
    }
    this.maxPercentageControl.setValue(maxPercentage ?? null);
  }

  @Output() saveGrade = new EventEmitter<CreateGradeDto>();

  readonly form: GradeForm;
  readonly maxPercentageControl = new FormControl<number | null>({ value: null, disabled: true });

  constructor(private readonly fb: FormBuilder, private readonly toastr: ToastrHelper) {
    this.form = this.createForm();
    console.log(this.form);
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.toastr.error('configuration.toastr.error.invalidForm');
      return;
    }

    const formValue: GradeFormValueModel = this.form.value as GradeFormValueModel;
    const createGradeDto: CreateGradeDto = ObjectUtils.removeFlatNulls(formValue);
    this.saveGrade.emit(createGradeDto);
  }

  private createForm(): GradeForm {
    return this.fb.group({
      minPercentage: this.fb.control<number | null>(null, {
        validators: [Validators.required, Validators.min(0), Validators.max(100)],
      }),
      symbolicGrade: this.fb.control<string | null>(null, Validators.required),
      descriptiveGrade: this.fb.control<string | null>(null),
    });
  }
}
