import { Observable } from 'rxjs';
import { animation } from './../../shared/animations.service';
import { CourseCardsService } from './../../shared/course-cards.service';
import { CourseCard } from '../../shared/course-card.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

  constructor(private courseCardsService: CourseCardsService) {
    this.courseCards = courseCardsService.getCoursesFromApi();
    // console.log(this.courseCards);
  }

  ngOnInit() {}

  knowMore() {
    this.nextStep = true;
  }
}
