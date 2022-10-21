import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeDetailsComponent implements OnInit {
  vm = 123;

  constructor(private readonly fb: UntypedFormBuilder) {}

  ngOnInit(): void {}

  private createForm(): UntypedFormGroup {
    return this.fb.group({
      id: [],
      symbolicGrade: [],
      descriptiveGrade: [],
      minPercentage: [],
    });
  }
}
