import { Component, OnInit, Input } from '@angular/core';
import { CourseCardsService } from './../../../../shared/course-cards.service';
import { CourseModule } from './../../../../shared/course-module.model';
import { CourseCard } from './../../../../shared/course-card.model';

@Component({
  selector: 'app-course-info-tabs',
  templateUrl: './course-info-tabs.component.html',
  styleUrls: ['./course-info-tabs.component.styl']
})
export class CourseInfoTabsComponent implements OnInit {
  @Input() modules: CourseModule[];
  @Input() extraModules: CourseModule[];
  @Input() test: CourseModule;
  @Input() toggleRegistration: ( boo: boolean ) => void;
  @Input() card: CourseCard;
  activeLi: number;
  activeBlock: string;
  finHeight: string;
  color: string;

  constructor(private cardService: CourseCardsService) { }

  removeActive() {
    this.cardService.setActiveCard(-1);
  }

  expand(index: number, { clientHeight }: HTMLElement, block: string, headerHeight: number) {
    this.activeLi = this.activeLi === index && this.activeBlock === block ? -1 : index;
    this.activeBlock = block;
    this.finHeight = clientHeight + headerHeight + 25 + 'px';
  }

  defineColor(): any {
    this.color = this.card.backgroundColor;
  }

  ngOnInit() {
    this.defineColor();
  }

}
