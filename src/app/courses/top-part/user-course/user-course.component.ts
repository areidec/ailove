import { HttpClient } from '@angular/common/http';
import { StateService } from './../../../main/main.service';
import { CourseCard, UserInfo } from './../../shared/course-card.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.styl'],
})
export class UserCourseComponent implements OnInit {
  courseCard: CourseCard;
  userInfo: UserInfo;
  finHeight: string;
  activeBlock: string;
  activeLi: number;
  disabled = false;

  constructor(private stateService: StateService, private httpClient: HttpClient) {
    this.courseCard = stateService.getUserCourse();
    this.userInfo = stateService.getUserInfo();
  }

  expand(index: number, element: HTMLElement, block: string, id: string) {
    const innerExpand = () => {
      this.activeLi = this.activeLi === index && this.activeBlock === block ? -1 : index;
      this.activeBlock = block;
      this.finHeight = element.clientHeight + window.innerWidth * 0.026 + 'px';
    };

    if (this.courseCard[block === 'base' ? 'modules' : 'extraModules'][index].info === undefined) {
      this.courseCard[block === 'base' ? 'modules' : 'extraModules'][
        index
      ].info = this.httpClient.get('/api/courses/current/' + id).pipe(
        map((res: any) => {
          console.log(res);
          setTimeout(() => {
            innerExpand();
          }, 20);
          return res.lessons;
        }),
      );
    } else {
      innerExpand();
    }
  }

  ngOnInit() {}
}
