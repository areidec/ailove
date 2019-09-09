import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { CurrentArticle } from '../article.model';
import { ArticlesService } from '../articles.service';
import { StateService } from 'src/app/main/main.service';
import { State } from 'src/app/main/state.model';
import { animation } from 'src/app/courses/shared/animations.service';

@Component({
  selector: 'app-articles-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.styl'],
  animations: [animation],
})
export class CategoryComponent implements OnInit {
  category: string;
  patternState: string;
  renderArticles: CurrentArticle[];
  renderArticlesArrs: (CurrentArticle[])[] = [];
  currentState: State;
  showArticlesIndex: number;

  constructor(
    private route: ActivatedRoute,
    private state: ArticlesService,
    private mainState: StateService,
  ) {
    this.showArticlesIndex = 0;
    mainState.activeState.subscribe((payload: State) => {
      this.currentState = payload;
      this.patternState = payload.id > 0 ? 'wide' : 'narrow';
      if (this.renderArticles) {
        this.renderArticlesArrs = this.groupArticles(this.renderArticles);
        this.showArticlesIndex = 0;
      }
    });
    this.state.renderArticles.subscribe((newRenderArticles) => {
      this.renderArticles = newRenderArticles;
      this.renderArticlesArrs = this.groupArticles(this.renderArticles);
      this.showArticlesIndex = 0;
    });
  }

  groupArticles(arr: CurrentArticle[]) {
    const { patternState, showArticlesIndex } = this;
    const indexHelper = patternState === 'narrow' ? 5 : 8;
    const newArr = [];
    arr.forEach((el, index) => {
      if (index % indexHelper === 0) {
        newArr.push(
          arr.filter(
            (filterEl, filterIndex) => filterIndex >= index && filterIndex < index + indexHelper,
          ),
        );
      }
    });
    return newArr;
  }

  getPatternData(index: number) {
    const { patternState } = this;
    if (patternState === 'narrow') {
      return index !== 0 && index !== 2;
    } else {
      const firstRow = index < 3 && index % 2 !== 0;
      const secondRow = index >= 3 && index < 5;
      const thirdRow = index >= 5 && index % 2 === 0;
      return firstRow || secondRow || thirdRow;
    }
  }

  ngOnInit() {}

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

  defineArticlesParentStyle(index: number) {
    const { showArticlesIndex, patternState } = this;
    return {
      show: index <= showArticlesIndex,
      wide: patternState === 'wide',
      narrow: patternState === 'narrow',
    };
  }
}
