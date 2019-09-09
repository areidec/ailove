import { CourseCardsService } from './../../../../shared/course-cards.service';
import { CourseModule } from './../../../../shared/course-module.model';
import { Component, OnInit, Input } from '@angular/core';

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
  finHeight: string;
  activeBlock: string;
  activeLi: number;

  constructor(private cardService: CourseCardsService) {}

  removeActive() {
    this.cardService.setActiveCard(-1);
  }

  expand(index: number, { clientHeight }: HTMLElement, block: string) {
    this.activeLi = this.activeLi === index && this.activeBlock === block ? -1 : index;
    this.activeBlock = block;
    this.finHeight = clientHeight + window.innerWidth * 0.046 + 'px';
  }

  ngOnInit() {}
}
