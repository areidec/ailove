import { CourseCard } from '../../../shared/course-card.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.styl'],
})
export class CourseCardComponent implements OnInit {
  @Input() card: CourseCard;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}

  cardStyle(): { backgroundColor: string; color: string } {
    const { backgroundColor, color } = this.card;
    return {
      backgroundColor,
      color,
    };
  }
}
