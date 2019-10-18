import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { SlugMapEl } from '../article.model';
import { StateService } from 'src/app/main/main.service';
import { State } from 'src/app/main/state.model';
import { slideInTop } from 'src/app/courses/shared/animations.service';
import { Tag, TagInner } from './search/search.model';

@Component({
  selector: 'app-articles-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.styl'],
  animations: [slideInTop],
})
export class FilterComponent {
  private slugMap: SlugMapEl[];
  public filters: string[];
  public currIndex: number;
  public translate: number;
  public animate: boolean;
  currentState: State;
  activeFilter = 'Все';
  showSearch = false;
  // DEV stroka
  // showSearch = true;
  public toggleSearch: (nextVal: boolean) => void;
  public searchCategory: string;
  public keyword = '';
  public searchTags: TagInner[] = [];
  public resetSearch: () => void;
  public removeTag: (tag: TagInner) => void;
  public removeKeyWord: () => void;

  @ViewChild('filterList', { static: true }) filterList: ElementRef;

  constructor(private state: ArticlesService, private mainState: StateService) {
    this.slugMap = state.getSlugMap();
    state.filtersObs.subscribe((newFilters) => {
      this.filters = [...newFilters];
      // Initial filter selection.
      // Instead of ngOnInit() put it here, because of waiting for response from API
      const initialCategory = this.filters[0];
      this.setFilter(initialCategory, false);
    });
    state.currentFilter.subscribe((newFilter: string) => {
      this.activeFilter = newFilter;
    });
    this.translate = 0;

    mainState.activeState.subscribe((payload: State) => {
      const { currentState: prevState } = this;
      this.currentState = payload;
      if (prevState && (prevState.id === 0 && this.currentState.id === 1)) {
        this.setFilter(this.activeFilter, false);
      }
    });

    // Search logic
    this.toggleSearch = (newVal: boolean) => state.toggleSearch(newVal);
    this.resetSearch = () => state.emitSearch({ type: 'clear' });
    this.removeTag = (tag: TagInner) => {
      state.emitSearch({ type: 'remove', value: tag });
    };
    this.removeKeyWord = () => state.emitSearch({ type: 'keyword' });
    state.showSearch.subscribe((next: boolean) => {
      this.showSearch = next;
    });
    state.selectedTagsObs.subscribe((nextTags: Tag) => {
      const { category, tags } = nextTags;
      this.searchCategory = category;
      this.searchTags = tags;
    });
    state.keywordObs.subscribe((nextKeyWord: string) => {
      this.keyword = nextKeyWord;
    });
  }

  setFilter(inputFilter: string, animate: boolean = true) {
    // this.activeFilter = inputFilter;
    // this.state.applyFilter(this.activeFilter);
    this.state.applyFilter(inputFilter);
  }

  hasKeyword = () => this.keyword.replace(/ /g, '').length > 0;

  defineCssState() {
    return this.currentState
      ? {
          initial: this.currentState.id === 0,
          courses: this.currentState.id === 1,
          articles: this.currentState.id === 2,
        }
      : {
          initial: true,
        };
  }

  defineActiveFilter(filter: string) {
    return {
      active: filter
        .replace(/ /g, '')
        .toLowerCase()
        .match(this.activeFilter.replace(/ /g, '').toLowerCase()),
      animate: this.animate,
    };
  }
}
