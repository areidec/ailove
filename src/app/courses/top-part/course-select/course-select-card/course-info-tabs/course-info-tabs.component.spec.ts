import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInfoTabsComponent } from './course-info-tabs.component';

describe('CourseInfoTabsComponent', () => {
  let component: CourseInfoTabsComponent;
  let fixture: ComponentFixture<CourseInfoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInfoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInfoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
