import { StateService } from 'src/app/main/main.service';
import { CourseCardsService } from './../../../shared/course-cards.service';
import { CourseModule } from './../../../shared/course-module.model';
import { animation, fade, courseFade } from './../../../shared/animations.service';
import { CourseCard } from './../../../shared/course-card.model';
import { Component, OnInit, Input } from '@angular/core';

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
  constructor(private cardService: CourseCardsService, private stateService: StateService) {
    cardService.currentActiveCard.subscribe((payload: number) => {
      this.active = payload === this.index;
    });
    stateService.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });
    this.userCourse = stateService.getUserCourse();
    stateService.checkUser();
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
  }

  cardStyle(): { backgroundColor: string; color: string } {
    const { backgroundColor, color } = this.card;
    return {
      backgroundColor,
      color,
    };
  }
}
