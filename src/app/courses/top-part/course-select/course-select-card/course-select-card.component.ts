import { StateService } from 'src/app/main/main.service';
import { CourseCardsService } from './../../../shared/course-cards.service';
import { CourseModule } from './../../../shared/course-module.model';
import { animation, fade, courseFade } from './../../../shared/animations.service';
import { CourseCard } from './../../../shared/course-card.model';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RegistrationService } from 'src/app/shared/registration/registration.service';
import { MatDialog } from '@angular/material/dialog';
import {VideoDialogComponent} from '../../../../shared/dialog/video-dialog/video-dialog.component';
import { DialogCourseDisableComponent } from '../../../../shared/dialog/course-disable/course-disable.component';

@Component({
  selector: 'app-course-select-card',
  templateUrl: './course-select-card.component.html',
  styleUrls: ['./course-select-card.component.styl'],
  animations: [animation, fade, courseFade],
})
export class CourseSelectCardComponent implements OnInit {
  @Input() card: CourseCard;
  @Input() index: number;
  userLogined = false;
  userCourse: CourseCard;
  // dev
  hovered: boolean;
  active: boolean;
  courseDuration: { hours: number; minutes: number };
  showRegistration = false;
  animal: string;
  name: string;
  toggleRegistration: (nextVal: boolean) => void;
  mobileResolution: boolean;
  constructor(
    private cardService: CourseCardsService,
    private stateService: StateService,
    private registrationState: RegistrationService,
    public dialog: MatDialog,
  ) {
    cardService.currentActiveCard.subscribe((payload: number) => {
      this.active = payload === this.index;
    });
    stateService.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });
    this.userCourse = stateService.getUserCourse();
    stateService.checkUser();

    registrationState.showRegistrationSubject.subscribe((payload: boolean) => {
      this.showRegistration = payload;
    });
    registrationState.registrationDoneObs.subscribe((payload: boolean) => {
      if (payload) {
        this.stateService.getUserCourseAndInfo();
      }
    });
    this.toggleRegistration = (nextVal) => registrationState.toggleRegistration(nextVal);
  }

  setActive() {
    this.cardService.setActiveCard(this.index);
  }

  ngOnInit() {
    const finDuration = this.card.modules
      .map(({ duration }: CourseModule) => duration / 60)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    this.courseDuration = {
      hours: Math.floor(finDuration),
      minutes: Math.round((finDuration % Math.floor(finDuration)) * 60),
    };
    this.onResize();
  }

  cardStyle(): { backgroundColor: string; color: string } {
    const { backgroundColor, color } = this.card;
    return {
      backgroundColor,
      color,
    };
  }

  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
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

  courseDisable(): void {
    const dialogRef = this.dialog.open(DialogCourseDisableComponent, {
      width: '28.125vw',
    });
  }

}
