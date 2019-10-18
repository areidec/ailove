import { HttpClient } from '@angular/common/http';
import { StateService } from './../../../main/main.service';
import { CourseCard, UserInfo } from './../../shared/course-card.model';
import {Component, HostListener, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

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
  mobileResolution: boolean;

  // Reference about variable inside Component
  @ViewChildren('about') about: QueryList<ElementRef>;

  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
  }

  constructor(private stateService: StateService, private httpClient: HttpClient) {
    this.courseCard = stateService.getUserCourse();
    this.userInfo = stateService.getUserInfo();
  }

  setStartActive() {
    let index: number = -1;
    let element: ElementRef | undefined = undefined;
    let block: string = '';
    let id: string = '';
    index = this.courseCard.modules.findIndex(module => module.completed !== module.count || module.completed === 0);
    if(index !== -1) {
      block = 'base';
      id = ''+this.courseCard.modules[index].id;
    } else {
      index = this.courseCard.extraModules.findIndex(module => module.completed !== module.count || module.completed === 0);
      if(index !== -1) {
        block = 'extraModules';
        id = ''+this.courseCard.extraModules[index].id;
      }
    }
    if(index !== -1) {
      element = this.about.find((item, idx) => index === idx);
      this.expand(index, element.nativeElement as HTMLElement, block, id);
    }
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
          setTimeout(() => {
            innerExpand();
          }, 50);
          return res.lessons;
        }),
      );
    } else {
      innerExpand();
    }
  }

  ngOnInit() {
    this.onResize();
  }

  ngAfterViewInit() {
    this.setStartActive();
  }
}
