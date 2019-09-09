import { CourseCard } from './../../courses/shared/course-card.model';
import { CourseCardsService } from './../../courses/shared/course-cards.service';
import { ArticlesService } from './../articles.service';
import { Observable } from 'rxjs';
import { State } from './../../main/state.model';
import { StateService } from 'src/app/main/main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentArticle } from '../article.model';
import { format } from 'date-fns';
import { slideInBottom } from 'src/app/courses/shared/animations.service';
// import ru from 'date-fns/locale/ru';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.styl'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideInBottom],
})
export class ArticleComponent implements OnInit {
  currentState: State;
  currentArticle: CurrentArticle;
  courses: CourseCard[];

  constructor(
    private mainState: StateService,
    private articleService: ArticlesService,
    private courseService: CourseCardsService,
  ) {
    this.currentState = mainState.getCurrentState();
    mainState.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });

    articleService.currentArticleSubscribe.subscribe((payload: CurrentArticle) => {
      this.currentArticle = payload;
    });

    this.courses = courseService.getCoursesFromApi();
  }

  ngOnInit() {
    this.mainState.setActiveState(2);
  }

  relatedCourseBg() {
    if (!this.currentArticle) {
      return {};
    }
    const course = this.courses.find(({ id }) => id === this.currentArticle.related_course.id);
    const { backgroundColor, name, color, about } = course;
    return {
      backgroundColor,
      name,
      color,
      about,
    };
  }

  formatDate(date: string) {
    if (!date) {
      return null;
    }
    const formatDate = date.split('-').map((el) => parseInt(el, 10));
    return format(new Date(formatDate[0], formatDate[1], formatDate[2]), 'D MMMM YYYY');
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
