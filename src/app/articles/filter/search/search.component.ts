import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { Tag, TagInner } from './search.model';
import { ReplaySubject, Subscription } from 'rxjs';
import { CurrentArticle } from '../../article.model';

@Component({
  selector: 'app-articles-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.styl'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public tags: Tag[];
  public tabs: string[];
  public currentIndex: number;
  public toggleSearch: (nextVal: boolean) => void;
  public selectedTags: TagInner[] = [];
  public selectedTagsObs: ReplaySubject<Tag>;
  public keywordObs: ReplaySubject<string>;
  public renderArticles: CurrentArticle[];
  public keyword = '';
  private defineMobile = false;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.isMob();
  }

  private subscriptions: Subscription[];

  constructor(articlesServise: ArticlesService) {
    this.toggleSearch = (nextVal: boolean) => articlesServise.toggleSearch(nextVal);
    this.selectedTagsObs = articlesServise.selectedTagsObs;
    this.keywordObs = articlesServise.keywordObs;
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
    articlesServise.searchEmmiter.subscribe((payload: { type: string; value?: TagInner }) => {
      const { type, value } = payload;
      switch (type) {
        case 'clear': {
          this.keyword = '';
          this.keywordObs.next(this.keyword);
          this.selectedTagsObs.next({
            category: this.tabs[this.currentIndex],
            tags: this.selectedTags,
          });
          this.clearTags();
          break;
        }
        case 'remove': {
          this.toggleTag(value);
          break;
        }
        case 'keyword': {
          this.keyword = '';
          this.keywordObs.next(this.keyword);
          this.selectedTagsObs.next({
            category: this.tabs[this.currentIndex],
            tags: this.selectedTags,
          });
          break;
        }
        default: {
          return false;
        }
      }
    });
  }

  getTags(tabName: string = 'Все') {
    if (!this.tags) {
      return [];
    }
    const removeDuplicates = (duplicatesArr: TagInner[]) =>
      duplicatesArr.filter(
        (tag, index, arr) =>
          arr.findIndex((el) => el.id === tag.id && el.text === tag.text) === index,
      );
    const { tags } = this;
    const finTags =
      tabName === 'Все'
        ? [
            ...new Set(
              removeDuplicates(tags.flatMap(({ tags: innerTags }) => (innerTags ? innerTags : []))),
            ),
          ]
        : tags.find(({ category }) => category === tabName).tags;
    return finTags;
  }

  toggleTag(inputTag: TagInner) {
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

  clearTags() {
    this.selectedTags = [];
    this.selectedTagsObs.next({ category: this.tabs[this.currentIndex], tags: [] });
  }

  handleInput() {
    const { keyword } = this;
    this.keywordObs.next(keyword);
    this.selectedTagsObs.next({ category: this.tabs[this.currentIndex], tags: this.selectedTags });
  }

  setNewIndex(index: number) {
    console.log('change index', index)
    this.currentIndex = index;
    this.clearTags();
  }

  submitSelection() {
    // if (this.keyword.replace(/ /g, '').length > 0) {
    //   // process keyword
    //   console.log(this.keyword);
    // } else {
    //   // maybe else
    // }
    this.toggleSearch(false);
  }

  private isMob() {
    if (window.innerWidth < 768) {
      this.defineMobile = true;
    } else {
      this.defineMobile = false;
    }
  }

  tagSelected = (tag: TagInner) => this.selectedTags.some((el) => el.text === tag.text);

  getItemsFoundInnerHTML() {
    if (!this.renderArticles) {
      return '';
    }
    const getMaterialsWord = (num: number) => {
      if (num % 10 === 1) {
        return 'материал';
      } else if ( this.defineMobile ) {
        return  '';
      } else if ((num % 10 >= 5 && num % 10 <= 9) || num % 10 === 0) {
        return 'материалов';
      } else {
        return 'материала';
      }
    };
    const { length } = this.renderArticles;
    const foundWord = length % 10 === 1 ? 'Найден' : 'Найдено';
    const materialsWord = getMaterialsWord(length);
    return `${foundWord}:&nbsp;${length}&nbsp;${materialsWord}`;
  }


  ngOnInit() {
    setTimeout(() => {
      this.keyword = '';
      this.keywordObs.next(this.keyword);
      this.selectedTagsObs.next({
        category: this.tabs[this.currentIndex],
        tags: this.selectedTags,
      });
    });
    this.isMob();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

}
