import { CourseModule } from './../courses/shared/course-module.model';
import {
  CourseCard,
  ApiModel,
  UserInfo,
  UserInfoResponse,
} from './../courses/shared/course-card.model';
import { CommonVideoUrl } from '../courses/top-part/initial/commonVideo.model';
import { TeachersService } from './../courses/teachers/teachers.service';
import { CourseCardsService } from './../courses/shared/course-cards.service';
import { CookieService } from 'ngx-cookie-service';
import { State } from './state.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, forkJoin, ReplaySubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { RegistrationService } from '../shared/registration/registration.service';


@Injectable()
export class StateService {
  private states: State[] = [
    new State({ id: 0, base: '' }),
    new State({ id: 1, base: 'courses' }),
    new State({ id: 2, base: 'articles' }),
    new State({ id: 3, base: '404' }),
  ];
  public activeState: ReplaySubject<State> = new ReplaySubject<State>();
  public userLogined: Subject<boolean> = new Subject<boolean>();
  public load: Subject<boolean> = new Subject<boolean>();
  private loginedUserCourse: CourseCard;
  private userInfo: UserInfo;
  public loginedUserCourseSubject = new ReplaySubject<CourseCard>();
  public userInfoSubject = new ReplaySubject<UserInfo>();
  public currentState: State;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private courseCardService: CourseCardsService,
    private teachersService: TeachersService,
    private registrationService: RegistrationService,
  ) {}

  loading() {
    forkJoin([
      this.courseCardService.callToApi(),
      this.teachersService.callToApi(),
      this.registrationService.getProgramSources(),
      this.registrationService.getCoursesList(),
      this.registrationService.getAreas(),
    ]).subscribe(() => {
      if (this.checkUser()) {
        this.getUserCourseAndInfo();
      } else {
        this.load.next(true);
      }
    });
  }

  getStates() {
    return this.states;
  }

  checkUser() {
    if (this.cookieService.check('gbc_user_token')) {
      this.userLogined.next(true);
      return true;
    }
  }

  getUserCourseAndInfo() {
    forkJoin([this.callUserCourseFromApi(), this.getUserInfoFromApi()]).subscribe(
      ([course, user]: [CourseCard, UserInfo]) => {
        this.loginedUserCourse = course;
        this.userInfo = user;
        this.loginedUserCourseSubject.next(course);
        this.userInfoSubject.next(user);
        this.userLogined.next(true);
        this.load.next(true);
      },
    );
  }

  loginUser(email: string, password: string) {
    console.log({ email, password });
    return this.httpClient.post('/api/auth/login', { email, password }).pipe(
      map(() => {
        this.getUserCourseAndInfo();
      }),
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  handleError(err: HttpErrorResponse) {
    const { validation_errors } = err.error;
    const errorsArr = [];
    Object.keys(validation_errors).forEach((el) => errorsArr.push(...validation_errors[el]));
    return throwError(errorsArr);
  }

  restorePassword(email: string) {
    console.log({ email });
    return this.httpClient.post('/api/auth/restore-password', { email }).pipe(
      map(() => {
        console.log('password restored');
      }),
      catchError(this.handleError),
    );
  }

  logoutUser() {
    console.log('logout');
    this.httpClient.post('/api/auth/logout', {}).subscribe((res) => this.userLogined.next(false));
  }

  getUserInfoFromApi(): Observable<UserInfo> {
    return this.httpClient.get('/api/users/current').pipe(
      map((res: UserInfoResponse) => {
        return {
          firstName: res.first_name,
          lastName: res.last_name,
          avatar: res.avatar,
          email: res.email,
          emailVerified: res.is_email_verified,
        };
      }),
    );
  }

  callUserCourseFromApi(): Observable<CourseCard> {
    return this.httpClient.get('/api/courses/current').pipe(
      map(
        ({
          title: name,
          about,
          background_color: backgroundColor,
          color,
          modules,
          extra_modules,
          final_test,
          id,
          youtube_video_url
        }: ApiModel) => {
          const createModules = (base: []) => {
            return base.map(
              ({ pk, title, info, duration, lessons_count, completed_lessons_count, state }) => {
                return new CourseModule({
                  name: title,
                  about: info,
                  duration,
                  id: pk,
                  count: lessons_count,
                  completed: completed_lessons_count,
                  state,
                });
              },
            );
          };
          const test = new CourseModule({
            name: final_test.title,
            about: final_test.info,
            duration: final_test.duration,
            state: final_test.state,
          });
          return new CourseCard({
            name,
            about,
            backgroundColor,
            color,
            modules: createModules(modules),
            extraModules: createModules(extra_modules),
            test,
            id,
            youtube_video_url
          });
        },
      ),
    );
  }

  getUserCourse() {
    return this.loginedUserCourse;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getCurrentState() {
    return this.currentState;
  }

  setActiveState(nextId: number) {
    const nextState = this.states.find(({ id }: State) => id === nextId);
    this.currentState = nextState;
    this.activeState.next(nextState);
  }

  getCommonVideo(): Observable<CommonVideoUrl> {
    // @ts-ignore
    return this.httpClient.get('/api/common/site-config');
  }
}

