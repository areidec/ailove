import { Observable } from 'rxjs';
import { CourseCard } from './../../shared/course-card.model';
import { CourseCardsService } from './../../shared/course-cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.styl'],
})
export class CourseSelectComponent implements OnInit {
  coursesList: CourseCard[];
  coursesFromApi: any;
  constructor(private coursesCardsService: CourseCardsService) {
    this.coursesList = coursesCardsService.getCoursesFromApi();
  }

  ngOnInit() { }
}
