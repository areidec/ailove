import { CourseCard } from '../../../shared/course-card.model';
import {Component, OnInit, Input, HostListener} from '@angular/core';
import { StateService } from 'src/app/main/main.service';
import { RegistrationService } from 'src/app/shared/registration/registration.service';
import {State} from '../../../../main/state.model';

import { CourseCardsService } from './../../../shared/course-cards.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.styl'],
})
export class CourseCardComponent implements OnInit {
  @Input() card: CourseCard;
  @Input() index: number;
  @HostListener('window:resize', ['$event']) detectIsMobileRes() {
    window.innerWidth < 768 ? this.isMobileResolution = true : this.isMobileResolution = false;
  }
  isMobileResolution: boolean;
  showRegistration = false;
  animal: string;
  name: string;
  toggleRegistration: (nextVal: boolean) => void;
  currentState: State = new State({ id: 0, base: '' });
  constructor(private stateService: StateService, private registrationState: RegistrationService,
              private state: StateService, private cardService: CourseCardsService) {
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

  ngOnInit() {
    this.detectIsMobileRes();
  }

  cardStyle(): { backgroundColor: string; color: string } {
    const { backgroundColor, color } = this.card;
    return {
      backgroundColor,
      color,
    };
  }

  colorButton(): { color: string } {
    const { backgroundColor: color } = this.card;
    if ( window.innerWidth < 768 ) {
      return {
        color
      };
    }
  }

  colorNumbers(): { color: string } {
    const {color} = this.card;
    return {
      color
    };
  }

  numbers() {
    if ( this.index < 9 ) {
      return `0${this.index + 1}`;
    } else {
      return this.index + 1;
    }
  }


  toggleToCourse() {
    const path = this.currentState.id === 1 ? 2 : 1;
    this.state.setActiveState(path);
    setTimeout(() => {
      this.cardService.setActiveCard(this.index);
    }, 0);
  }

}
