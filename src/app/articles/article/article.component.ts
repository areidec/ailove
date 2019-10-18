import { CourseCard, UserInfo } from './../../courses/shared/course-card.model';
import { CourseCardsService } from './../../courses/shared/course-cards.service';
import { ArticlesService } from './../articles.service';
import { Observable } from 'rxjs';
import { State } from './../../main/state.model';
import { StateService } from 'src/app/main/main.service';
import { Component, OnInit, AfterViewInit, ViewEncapsulation,
  HostListener, ViewChild, ElementRef  } from '@angular/core';
import { CurrentArticle } from '../article.model';
import { format } from 'date-fns';
import * as ru from 'date-fns/locale/ru';
import { slideInBottom } from 'src/app/courses/shared/animations.service';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from 'src/app/shared/registration/registration.service';
import { DialogCourseDisableComponent } from 'src/app/shared/dialog/course-disable/course-disable.component';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../../shared/dialog/video-dialog/video-dialog.component';

import { Meta } from '@angular/platform-browser';

interface CallToAction {
  color: string,
  bgc: string,
  title: string,
  description: string,
  url: string
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.styl'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideInBottom],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  currentState: State;
  currentArticle: CurrentArticle;
  courses: CourseCard[];
  showRegistration = false;
  animal: string;
  name: string;
  toggleRegistration: (nextVal: boolean) => void;
  userCourse: CourseCard;
  userInfo: UserInfo;
  disabled = false;
  mobileResolution: boolean;
  userLogined = false;
  visiblePlashka: boolean;
  contentBefore: string;
  contentAfter: string;
  settingsAction: CallToAction;
  patternState: string;
  payloadRequest = false;
  undefMidContent: boolean;

  constructor(
    private mainState: StateService,
    private articleService: ArticlesService,
    private courseService: CourseCardsService,
    private httpClient: HttpClient,
    private registrationState: RegistrationService,
    public dialog: MatDialog,
    private meta: Meta,
    private ref: ElementRef
  ) {
    this.userInfo = mainState.getUserInfo();
    this.currentState = mainState.getCurrentState();
    mainState.activeState.subscribe((payload: State) => {
      this.currentState = payload;
      this.patternState = payload.id > 0 ? 'wide' : 'narrow';
    });

    articleService.currentArticleSubscribe.subscribe((payload: CurrentArticle) => {
      this.currentArticle = payload;
      this.payloadRequest = true;
      this.purseArticle();
      this.updateMetaTags();
    });

    this.courses = courseService.getCoursesFromApi();

    registrationState.showRegistrationSubject.subscribe((payload: boolean) => {
      this.showRegistration = payload;
    });
    registrationState.registrationDoneObs.subscribe((payload: boolean) => {
      if (payload) {
        this.mainState.getUserCourseAndInfo();
      }
    });
    this.toggleRegistration = (nextVal) => registrationState.toggleRegistration(nextVal);

    mainState.userLogined.subscribe((res) => {
      this.userLogined = res;
      mainState.loginedUserCourseSubject.subscribe((res) => (this.userCourse = res));
      mainState.userInfoSubject.subscribe((res) => (this.userInfo = res));
    });
  }
  @ViewChild('smallCard', { static: false }) smallCard: ElementRef;
  @ViewChild('bigCard', { static: false }) bigCard: ElementRef;
  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
  }
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    // tslint:disable-next-line:max-line-length
    if (this.bigCard.nativeElement.getBoundingClientRect().top - window.innerHeight - 300 > 0) {
      this.visiblePlashka = true;
    } else {
      this.visiblePlashka = false;
    }
  }

  ngOnInit() {
    // this.mainState.setActiveState(2);
    this.onResize();
    console.log(this.userInfo);
  }

  ngAfterViewInit() { }

  relatedCourseBg() {
    if (!this.currentArticle) {
      return {};
    }
    let course = this.courses.find(({ id }) => id === this.currentArticle.related_course.id);
    if (!Object.keys(course).length) course = this.courses[0];
    const { backgroundColor, name, color, about } = course;
    return {
      backgroundColor,
      name,
      color,
      about,
    };
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

  formatDate(date: string) {
    if (!date) {
      return null;
    }
    const formatDate = date.split('-').map((el) => parseInt(el, 10));
    return format(new Date(formatDate[0], formatDate[1], formatDate[2]), 'D MMMM YYYY', {
      locale: ru,
    });
  }

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

  likeArticle() {
    if (this.currentArticle.user_already_liked) {
      this.httpClient.delete(`/api/articles/${this.currentArticle.id}/like`).subscribe((res) => {
        this.articleService.refreshComments();
      });
    } else {
      this.httpClient.post(`/api/articles/${this.currentArticle.id}/like`, {}).subscribe((res) => {
        this.articleService.refreshComments();
      });
    }
  }

  openDialog(): void {
    if (this.userCourse.id === this.currentArticle.related_course.id) {
      const dialogRef = this.dialog.open(DialogCourseDisableComponent, {
        width: '28.125vw',
      });

      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      console.log(window.location);
      window.location.href = 'https://google.com';
    }
  }

  openVideo(url: string): any {
    if (typeof url === 'undefined') return;
    if (this.mobileResolution) {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        width: '100vw',
        height: '31vh',
        panelClass: "video-dialog",
        backdropClass: 'class-super',
        data: { url: url }
      });
    } else {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        width: '52.083vw',
        height: '51vh',
        panelClass: "video-dialog",
        data: { url: url }
      });
    }
  }

  purseArticle(): any {
    const idx = this.currentArticle.content.indexOf('article-content-inner') - 12;
    if (idx != -13) {
      this.undefMidContent = false;
      // const idx = this.currentArticle.content.indexOf('article-content-inner') - 12;
      this.contentBefore = this.currentArticle.content.slice(0, idx);
      const beforeCut = this.currentArticle.content.slice(idx);
      const cutDom = new DOMParser().parseFromString(beforeCut, 'text/html');
      const callToAction = cutDom.querySelector('.article-content-inner');
      // get content After
      cutDom.querySelector('.article-content-inner').remove();
      const resultString = [];
      cutDom.getElementsByTagName('body')[0].childNodes.forEach(child => {
        // @ts-ignore
        child.nodeName === '#text' ? resultString.push(child.textContent) : resultString.push(child.outerHTML);
      });
      this.contentAfter = resultString.join('');
      // get content End
      const color = callToAction.getAttribute('text-color');
      const bgc = callToAction.getAttribute('course-backgorund-color');
      const title = callToAction.querySelector('h3').innerText;
      const description = callToAction.querySelector('p') ?
        callToAction.querySelector('p').innerText : 'описание не передано';
      const url = callToAction.getAttribute('youtube-video-url') ?
        callToAction.getAttribute('youtube-video-url') :
        'https://www.youtube.com/embed?v=9Hp9WXA9YNo';
      this.settingsAction = {
        color,
        bgc,
        title,
        description,
        url
      };
    } else {
      this.undefMidContent = true;
    }
  }

  updateMetaTags(): void {
    this.meta.updateTag({property: 'og:title', content: this.currentArticle.title});
    this.meta.updateTag({property: 'og:description', content: this.currentArticle.description});
    this.meta.updateTag({property: 'og:image', content: this.currentArticle.poster_image});
  }

  scrollTop(): void {
    this.ref.nativeElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}
