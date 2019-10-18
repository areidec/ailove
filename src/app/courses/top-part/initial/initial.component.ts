import { Observable } from 'rxjs';
import { animation } from './../../shared/animations.service';
import { CourseCardsService } from './../../shared/course-cards.service';
import {CourseCard, UserInfo} from '../../shared/course-card.model';
import {Component, OnInit, Input, EventEmitter, Output, HostListener} from '@angular/core';

import { StateService } from 'src/app/main/main.service';
import { State } from 'src/app/main/state.model';
import { RegistrationService } from 'src/app/shared/registration/registration.service';
import { DialogLoginComponent } from 'src/app/shared/dialog/login/dialog-login.component';
import {MatDialog} from '@angular/material';
import {VideoDialogComponent} from '../../../shared/dialog/video-dialog/video-dialog.component';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.styl'],
  animations: [animation],
})
export class InitialComponent implements OnInit {
  nextStep = false;
  // courseCards: Observable<CourseCard[]>;
  courseCards: CourseCard[];
  commonVideo: string;
  currentState: State;
  userLogined = false;
  showRegistration = false;
  mobileResolution: boolean;
  private toggleRegistration: (nextVal: boolean) => void;

  constructor(
    private courseCardsService: CourseCardsService,
    private mainState: StateService,
    private registrationState: RegistrationService,
    public dialog: MatDialog
    ) {
      this.courseCards = courseCardsService.getCoursesFromApi();
      // console.log(this.courseCards);
      mainState.activeState.subscribe((payload: State) => {
        this.currentState = payload;
      });

      mainState.getCommonVideo().subscribe(payload => {
        this.commonVideo = payload.main_video;
      })

      mainState.userLogined.subscribe((payload: boolean) => {
        this.userLogined = payload;
      });

      mainState.checkUser();

      // registration
      registrationState.showRegistrationSubject.subscribe((payload: boolean) => {
        this.showRegistration = payload;
      });
      registrationState.registrationDoneObs.subscribe((payload: boolean) => {
        if (payload) {
          this.mainState.getUserCourseAndInfo();
        }
      });
      this.toggleRegistration = (nextVal) => registrationState.toggleRegistration(nextVal);
    }


  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
  }

  ngOnInit() {
    this.onResize();
  }

  knowMore() {
    this.nextStep = true;
  }

  toggleToCourses() {
    const path = this.currentState.id === 1 ? 2 : 1;
    this.mainState.setActiveState(path);
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

}
