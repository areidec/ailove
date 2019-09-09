import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesWrapComponent } from './articles-wrap.component';

describe('ArticlesWrapComponent', () => {
  let component: ArticlesWrapComponent;
  let fixture: ComponentFixture<ArticlesWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
