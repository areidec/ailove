import { Component, OnInit, Input } from '@angular/core';
import { CurrentArticle } from '../article.model';

@Component({
  selector: 'app-articles-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl'],
})
export class CardComponent implements OnInit {
  @Input() article: CurrentArticle;
  @Input() big: boolean;

  constructor() {}

  ngOnInit() {}
}
