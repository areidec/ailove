import { Component, OnInit } from '@angular/core';
// import { ArticlesService } from './articles.service';
import { Router, NavigationEnd, ActivatedRoute, Params, RouterEvent } from '@angular/router';
import { StateService } from '../main/main.service';
import { State } from '../main/state.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.styl'],
  // providers: [ArticlesService],
})
export class ArticlesComponent implements OnInit {
  currentState: State;

  constructor(private mainState: StateService) {
    mainState.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });
  }

  ngOnInit() {}

  defineCssState() {
    return this.currentState
      ? {
          initial: this.currentState.id === 0,
          courses: this.currentState.id === 1,
          articles: this.currentState.id === 2,
          error: this.currentState.id === 3,
        }
      : {
          initial: true,
        };
  }
}
