import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSelectInfoComponent } from './course-select-info.component';

describe('CourseSelectInfoComponent', () => {
  let component: CourseSelectInfoComponent;
  let fixture: ComponentFixture<CourseSelectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSelectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSelectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
