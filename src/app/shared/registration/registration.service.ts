import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegistrationInputField, UserData } from './registration.model';

import { format } from 'date-fns';

interface CourseItem {
  name: string;
  id: number;
}

interface City {
  name: string;
  id: number;
}

interface Area {
  name: string;
  id: number;
  cities?: City[];
}

@Injectable()
export class RegistrationService {
  public showRegistrationSubject: Subject<boolean> = new Subject<boolean>();
  private userData: UserData;

  private programSources: string[] = [];
  private coursesList: CourseItem[] = [{ name: '', id: 0 }];
  private areas: Area[] = [];

  public registrationDataObs: BehaviorSubject<RegistrationInputField[]> = new BehaviorSubject<
    RegistrationInputField[]
  >(null);

  public registrationDoneObs: Subject<boolean> = new Subject<boolean>();
  public globalErrors: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  private post: Subscription;

  constructor(private httpClient: HttpClient) {
    const rawRegistrData = this.setInputFields();
    this.registrationDataObs.next(rawRegistrData);
    this.userData = this.initUserData(rawRegistrData);
  }

  initUserData = (registrationData: RegistrationInputField[]): UserData => {
    const getVal = (name: string): string => {
      switch (name) {
        case 'sex': {
          return 'M';
        }
        default: {
          return '';
        }
      }
    };
    const userData = {};
    registrationData.forEach(({ name }) => {
      const val = getVal(name);
      Object.assign(userData, { [name]: val });
    });
    return userData;
  };

  getProgramSources() {
    return this.httpClient.get('/api/common/program-sources').pipe(
      map((res: []) => {
        this.programSources = res;
        this.registrationDataObs.next(this.setInputFields());
      }),
    );
  }

  getCoursesList() {
    return this.httpClient.get('/api/courses').pipe(
      map((res: []) => {
        const courseTitles = res.map(({ title, id }) => ({ name: title, id }));
        this.coursesList = courseTitles;
        this.registrationDataObs.next(this.setInputFields());
      }),
    );
  }

  getAreas() {
    return this.httpClient.get('/api/common/areas').pipe(
      map((res: []) => {
        const areas = res.map((el) => el);
        this.areas = areas;
        this.registrationDataObs.next(this.setInputFields());
      }),
    );
  }

  setInputFields = () => [
    {
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
    },
    {
      name: 'last_name',
      type: 'text',
      placeholder: 'Фамилия',
    },
    {
      name: 'birthday',
      type: 'datepicker',
      placeholder: 'Дата рождения',
    },
    {
      name: 'sex',
      type: 'radio',
      placeholder: 'Пол',
      values: [
        {
          name: 'Мужской',
          value: 'M',
        },
        {
          name: 'Женский',
          value: 'F',
        },
      ],
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Мобильный телефон',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      name: 'area_id',
      type: 'select',
      values: (() => this.areas.map(({ name, id }) => ({ name, value: id })))(),
      placeholder: 'Область',
    },
    {
      name: 'city_id',
      type: 'select',
      values: (() =>
        this.areas.find((el) => el.id === parseInt(this.userData.area_id, 10))
          ? this.areas
              .find((el) => el.id === parseInt(this.userData.area_id, 10))
              .cities.map(({ name, id }) => ({ name, value: id }))
          : [])(),
      placeholder: 'Город',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
    },
    {
      name: 'password_repeat',
      type: 'password',
      placeholder: 'Повторите пароль',
    },
    {
      name: 'course',
      type: 'select',
      values: (() => this.coursesList.map(({ name, id }) => ({ name, value: id })))(),
      placeholder: 'Какой курс желаете пройти?',
    },
    {
      name: 'program_source',
      type: 'select',
      values: (() => this.programSources.map((el) => ({ name: el, value: el })))(),
      placeholder: 'Откуда Вы узнали о программе?',
    },
  ];

  getUserData = () => this.userData;

  setUserData = (name: string, value: string) => {
    Object.assign(this.userData, { [name]: value });
    if (name === 'area_id') {
      this.registrationDataObs.next(this.setInputFields());
    }
  };

  toggleRegistration(nextVal = true) {
    this.showRegistrationSubject.next(nextVal);
  }

  submitRegistration(userData: UserData) {
    const processUserData = (data: UserData) => {
      const newData = Object.assign({}, data);
      Object.keys(data).forEach((key) => {
        if (key === 'phone') {
          const currStr = newData[key];
          const first = currStr.slice(0, 3);
          const second = currStr.slice(3, 6);
          const third = currStr.slice(6, 10);
          newData[key] = `+7 (${first}) ${second}-${third}`;
        }
        if (key === 'birthday') {
          const curr = newData[key];
          const formatDate = format(new Date(curr), 'YYYY-MM-DD');
          newData[key] = formatDate;
        }
        if (key === 'email') {
          const curr = newData[key];
          const domainMatch = curr.match(/.+@.+[.]/g);
          newData[key] = domainMatch === null ? `${curr}.com` : curr;
        }
      });
      return newData;
    };
    this.post = this.httpClient.post('/api/auth/register', processUserData(userData)).subscribe(
      () => {
        this.globalErrors.next([]);
        this.toggleRegistration(false);
        this.registrationDoneObs.next(true);
      },
      (err) => {
        const {
          error: { validation_errors },
        } = err;
        if (validation_errors) {
          const errorsArr = [];
          Object.keys(validation_errors).forEach((el) =>
            errorsArr.push([...validation_errors[el]]),
          );
          this.globalErrors.next(errorsArr);
        } else {
          this.globalErrors.next([]);
          this.toggleRegistration(false);
          this.registrationDoneObs.next(true);
        }
      },
    );
  }
}
