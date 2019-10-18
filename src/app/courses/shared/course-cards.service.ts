import { HttpClient } from '@angular/common/http';
import { CourseModule } from './course-module.model';
import { CourseCard, ApiModel } from './course-card.model';
import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseCardsService {
  public currentActiveCard: Subject<number> = new Subject<number>();
  public coursesFromApi: CourseCard[];

  setActiveCard(index: number) {
    this.currentActiveCard.next(index);
  }

  constructor(private httpClient: HttpClient) {}

  callToApi() {
    return this.httpClient.get('/api/courses').pipe(
      map((res: []) => {
        const finCourses = res.map(
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
                ({ pk, title, info, duration, lessons_count, completed_lessons_count, state, }) => {
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
        );
        this.coursesFromApi = finCourses;
      }),
    );
  }

  getCoursesFromApi(): CourseCard[] {
    return [...this.coursesFromApi];
  }
}
