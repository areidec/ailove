import { CourseCardsService } from './shared/course-cards.service';
import { State } from './../main/state.model';
import { StateService } from './../main/main.service';
import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.styl'],
})
export class CoursesComponent implements OnInit {
  currentState: State = new State({ id: 0, base: '' });
  mobileResolution: boolean;
  userLogined = false;

  constructor(private router: Router, private state: StateService) {
    state.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });
    state.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });
  }

  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
  }

  ngOnInit() {
    this.onResize();
  }
  buttonClick() {
    const path = this.currentState.id === 1 ? 2 : 1;
    this.state.setActiveState(path);
  }

  defineCssState() {
    return this.currentState
      ? {
          initial: this.currentState.id === 0,
          courses: this.currentState.id === 1,
          articles: this.currentState.id === 2,
        }
      : {
          initial: true,
        };
  }
}
