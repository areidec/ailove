import { CourseCardsService } from './../../../../shared/course-cards.service';
import { CourseModule } from './../../../../shared/course-module.model';
import { Component, OnInit, Input } from '@angular/core';
import {StateService} from '../../../../../main/main.service';
import {CourseCard} from '../../../../shared/course-card.model';
import { MatDialog } from '@angular/material/dialog';
import {DialogCourseDisableComponent} from '../../../../../shared/dialog/course-disable/course-disable.component';

@Component({
  selector: 'app-course-select-info',
  templateUrl: './course-select-info.component.html',
  styleUrls: ['./course-select-info.component.styl'],
})
export class CourseSelectInfoComponent implements OnInit {
  @Input() modules: CourseModule[];
  @Input() extraModules: CourseModule[];
  @Input() test: CourseModule;
  @Input() color: string;
  @Input() toggleRegistration: () => void;
  finHeight: string;
  activeBlock: string;
  activeLi: number;
  userLogined = false;

  constructor(
    private cardService: CourseCardsService, private stateService: StateService,
    public dialog: MatDialog) {
    stateService.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });
    stateService.checkUser();
  }

  removeActive() {
    this.cardService.setActiveCard(-1);
  }

  expand(index: number, { clientHeight }: HTMLElement, block: string) {
    this.activeLi = this.activeLi === index && this.activeBlock === block ? -1 : index;
    this.activeBlock = block;
    this.finHeight = clientHeight + window.innerWidth * 0.046 + 'px';
  }

  courseDisable(): void {
    const dialogRef = this.dialog.open(DialogCourseDisableComponent, {
      width: '28.125vw',
    });
  }

  ngOnInit() {}
}
