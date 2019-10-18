import { Component, OnInit, Input } from '@angular/core';
import { CurrentArticle } from '../article.model';
import {Tag, TagInner} from '../filter/search/search.model';

import { ArticlesService } from '../articles.service';
import {ReplaySubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-articles-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl'],
})
export class CardComponent implements OnInit {
  @Input() article: CurrentArticle;
  @Input() big: boolean;
  @Input() isNotHome: boolean;

  public selectedTagsObs: ReplaySubject<Tag>;
  public tags: Tag[];
  public tabs: string[];
  public selectedTags: TagInner[] = [];
  public currentIndex: number;
  public renderArticles: CurrentArticle[];
  private subscriptions: Subscription[];

  constructor(articlesServise: ArticlesService) {
    this.selectedTagsObs = articlesServise.selectedTagsObs;
    this.subscriptions = [
      articlesServise.tagsObs.subscribe((tags) => {
        this.tags = tags;
      }),
      articlesServise.filtersObs.subscribe((filters) => {
        this.tabs = filters;
      }),
      articlesServise.currentFilter.subscribe((newFilter: string) => {
        this.currentIndex = this.tabs ? this.tabs.findIndex((el) => el === newFilter) : 0;
        this.selectedTags = [];
      }),
      articlesServise.renderArticles.subscribe((articles: CurrentArticle[]) => {
        this.renderArticles = articles;
      }),
    ];
  }

  ngOnInit() {}

  tagSelected = (tag: TagInner) => this.selectedTags.some((el) => el.text === tag.text);

  toggleTag(e, inputTag: TagInner) {
    e.stopPropagation();
    if (inputTag) {
      const { id } = inputTag;
      const { selectedTags, tabs } = this;
      if (this.tagSelected(inputTag)) {
        selectedTags.splice(selectedTags.findIndex((el) => el.id === id), 1);
      } else {
        selectedTags.push(inputTag);
      }
      this.selectedTagsObs.next({ category: tabs[this.currentIndex], tags: selectedTags });
    }
  }

}
