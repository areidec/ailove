import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Teacher } from './teacher.model';

@Injectable()
export class TeachersService {
  public teachersFromApi: Teacher[];
  // private teachers: Teacher[] = [
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about: 'Эксперт в области разработки новых продуктов',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about:
  //       'Эксперт по защите интеллектуальной собственности, юридическому сопровождению компаний и предпринимателей',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about: 'Эксперт в области разработки новых продуктов',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about: 'Эксперт в области разработки новых продуктов',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about:
  //       'Эксперт по защите интеллектуальной собственности, юридическому сопровождению компаний и предпринимателей',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about: 'Эксперт в области разработки новых продуктов',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  //   new Teacher({
  //     name: 'Константин Холстинин',
  //     about:
  //       'Эксперт по защите интеллектуальной собственности, юридическому сопровождению компаний и предпринимателей',
  //     image: '/assets/courses/teachers/Bitmap.png',
  //   }),
  // ];
  // public activeState: Subject<State> = new Subject<State>();

  constructor(private httpClient: HttpClient) {}

  callToApi() {
    console.log('lel');
    return this.httpClient.get('/api/courses/mentors').pipe(
      map((res: []) => {
        const finTeachers = res.map(({ name, image, description: about }) => {
          return new Teacher({
            name,
            about,
            image,
          });
        });
        this.teachersFromApi = finTeachers;
      }),
    );
  }

  // getTeachers(): Teacher[] {
  //   return [...this.teachers];
  // }

  getTeachersFromApi(): Teacher[] {
    return [...this.teachersFromApi];
  }

  // setActiveState(nextId: number) {
  //   const nextState = this.states.find(({ id }: State) => id === nextId);
  //   this.activeState.next(nextState);
  // }
}
