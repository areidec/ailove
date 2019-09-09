import { CourseCardsService } from './../courses/shared/course-cards.service';
import { HttpClient } from '@angular/common/http';

import { State } from './state.model';
import { StateService } from './main.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles/articles.service';
import { Observable } from 'rxjs';
import { fade, slideInBottom } from '../courses/shared/animations.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl'],
  providers: [ArticlesService],
  animations: [fade, slideInBottom],
})
export class MainComponent implements OnInit {
  currentState: State;
  productsObservable: Observable<any[]>;
  loaded = false;
  userLogined = false;
  constructor(
    private state: StateService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private articlesService: ArticlesService,
  ) {
    state.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });
    state.load.subscribe((payload: boolean) => {
      this.loaded = payload;
    });
    state.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          state.setActiveState(0);
          articlesService.callToApi();
        } else {
          state.setActiveState(2);
          articlesService.getArticleFromApi(event.url);
        }
      }
    });
    state.loading();
  }

  ngOnInit() {}

  defineCssState() {
    return {
      initial: this.currentState.id === 0,
      courses: this.currentState.id === 1,
      articles: this.currentState.id === 2,
      'logined-theme': this.userLogined,
    };
  }
}
