import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSelectCardComponent } from './course-select-card.component';

describe('CourseSelectCardComponent', () => {
  let component: CourseSelectCardComponent;
  let fixture: ComponentFixture<CourseSelectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSelectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
