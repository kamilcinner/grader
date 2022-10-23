import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GradesState } from './grades.state';
import { Grades } from './grades.actions';
import { GradeModel } from '../models/grade.model';

describe('Grades actions', () => {
  let store: Store;
  const mock = {
    grade: {
      id: '',
      minPercentage: 0,
      symbolicGrade: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GradesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new Grades.Select(mock.grade));
    store
      .select((state) => state.selected.grade)
      .subscribe((grade: GradeModel) => {
        expect(grade).toEqual(mock.grade);
      });
  });
});
