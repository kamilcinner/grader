import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GradeModel } from '../models/grade.model';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesListComponent implements OnInit {
  @Input() data!: GradeModel[];

  constructor() {
    this.data = [
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
      {
        id: 'id',
        symbolicGrade: 'A',
        minPercentage: 50,
      },
    ];
  }

  ngOnInit(): void {}
}
