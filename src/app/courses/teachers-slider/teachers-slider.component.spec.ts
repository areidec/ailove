import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersSliderComponent } from './teachers-slider.component';

describe('TeachersSliderComponent', () => {
  let component: TeachersSliderComponent;
  let fixture: ComponentFixture<TeachersSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
