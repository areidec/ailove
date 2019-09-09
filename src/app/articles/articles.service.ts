import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleFilter, SlugMapEl, CurrentArticle } from './article.model';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Tag, TagInner } from './filter/search/search.model';

@Injectable()
export class ArticlesService {
  public currentFilter: ReplaySubject<string> = new ReplaySubject<string>();
  public renderArticles: ReplaySubject<CurrentArticle[]> = new ReplaySubject<CurrentArticle[]>();
  public currentArticleSubscribe: ReplaySubject<CurrentArticle> = new ReplaySubject<
    CurrentArticle
  >();
  public currentArticle: CurrentArticle;
  private currentArticleSlug: string;
  private articles: CurrentArticle[] = [];
  private slugMap: SlugMapEl[] = [
    {
      id: 0,
      filter: 'Все',
    },
  ];
  public filtersObs: BehaviorSubject<string[]>;
  public tagsObs: ReplaySubject<Tag[]> = new ReplaySubject<Tag[]>();
  public showSearch: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  public selectedTagsObs: ReplaySubject<Tag> = new ReplaySubject<Tag>();
  public keywordObs: ReplaySubject<string> = new ReplaySubject<string>();
  public keyword = '';
  public searchArticlesObs: ReplaySubject<CurrentArticle[]> = new ReplaySubject<CurrentArticle[]>();
  public searchEmmiter: Subject<{ type: string; value?: TagInner }> = new Subject<{
    type: string;
    value?: TagInner;
  }>();

  constructor(private httpClient: HttpClient) {
    this.filtersObs = new BehaviorSubject<string[]>(this.getFilters());
    this.selectedTagsObs.subscribe((selected: Tag) => {
      const processKeyword = (articles: CurrentArticle[], keyword: string) => {
        const containsKeyword = (kWord: string, checkArr: string[]) =>
          checkArr.some((el) => el.toLowerCase().includes(kWord.toLowerCase()));
        return articles.filter(({ content, title }) => containsKeyword(keyword, [content, title]));
      };
      //
      const { category, tags } = selected;
      if (tags.length > 0) {
        const articles = [...this.getArticles()];
        const filteredByCategory = articles.filter(
          ({ category: { text } }) => category === 'Все' || text === category,
        );
        const filteredByTags = filteredByCategory.filter(({ tags: articleTags }) =>
          tags
            .map(({ id }) => articleTags.some(({ id: articleTagId }) => articleTagId === id))
            .reduce((acc, cv) => acc && cv),
        );
        const filteredByKeyword =
          this.keyword.replace(/ /g, '').length > 0
            ? processKeyword(filteredByTags, this.keyword)
            : filteredByTags;
        this.searchArticlesObs.next(filteredByKeyword);
      } else if (this.keyword.replace(/ /g, '').length > 0) {
        const articles = [...this.getArticles()];
        const filteredByCategory = articles.filter(
          ({ category: { text } }) => category === 'Все' || text === category,
        );
        const filteredByKeyword =
          this.keyword.replace(/ /g, '').length > 0
            ? processKeyword(filteredByCategory, this.keyword)
            : articles;
        this.searchArticlesObs.next(filteredByKeyword);
      } else {
        this.applyFilter(category);
      }
    });
    this.searchArticlesObs.subscribe((articles: CurrentArticle[]) => {
      this.renderArticles.next(articles);
    });
    this.keywordObs.subscribe((nextKeyword: string) => {
      this.keyword = nextKeyword;
    });
  }

  callToApi() {
    this.httpClient.get('/api/articles').subscribe((res: CurrentArticle[]) => {
      const articles = [...res];
      articles.forEach((el) => {
        const filter = el.category;
        Object.assign(el, {
          filters: [filter],
        });
      });
      this.slugMap = this.initSlugMap(articles);
      this.articles = articles;
      this.filtersObs.next(this.getFilters());
      this.tagsObs.next(this.getTags());
      this.applyFilter();
    });
  }

  initSlugMap = (articles: CurrentArticle[]): SlugMapEl[] => [
    { id: 0, filter: 'Все' },
    ...articles.flatMap(({ filters }) => filters.flatMap(({ id, text }) => ({ id, filter: text }))),
  ];

  getSlugMap = () => this.slugMap;

  getArticles = () => this.articles;

  getFilters = (): string[] => {
    const articles: CurrentArticle[] = [...this.getArticles()];
    const initialFilterIndex = 0;
    const initialFilters = this.slugMap.flatMap(({ filter }, index) =>
      index <= initialFilterIndex ? filter : [],
    );
    const sortArticleFilterById = (a: ArticleFilter, b: ArticleFilter) => a.id - b.id;
    const filters: string[] = [
      ...initialFilters,
      ...new Set(
        articles
          .flatMap((el) => el.filters)
          .sort(sortArticleFilterById)
          .flatMap((el) => el.text),
      ),
    ];
    return filters;
  };

  getArticleFromApi(url: string) {
    this.currentArticleSlug = url;
    return this.httpClient.get(`/api/articles${url}`).subscribe((res: CurrentArticle) => {
      this.currentArticleSubscribe.next(new CurrentArticle({ ...res }));
    });
  }

  refreshComments() {
    this.httpClient
      .get(`/api/articles${this.currentArticleSlug}`)
      .subscribe((res: CurrentArticle) => {
        this.currentArticleSubscribe.next(new CurrentArticle({ ...res }));
      });
  }

  applyFilter = (name: string = 'Все') => {
    const slugMap = [...this.getSlugMap()];
    const { id: filterId } = slugMap.find(({ filter }) => filter === name);
    const articles: CurrentArticle[] = [...this.getArticles()];
    this.renderArticles.next(
      filterId === 0
        ? articles
        : articles.filter((el) => el.filters.some(({ id }) => id === filterId)),
    );
    this.currentFilter.next(name);
  };

  getTags = (): Tag[] => {
    const articles: CurrentArticle[] = [...this.getArticles()];
    const tagsArr = [];
    articles.forEach((el) => {
      const {
        category: { text },
        tags,
      } = el;
      if (tagsArr.some(({ category }) => category === text)) {
        const tagObj = tagsArr.find(({ category }) => category === text);
        tags.forEach((articleTag) => {
          if (!tagObj.tags.some(({ id }) => id === articleTag.id)) {
            tagObj.tags.push(articleTag);
          }
        });
      } else {
        tagsArr.push({
          category: text,
          tags,
        });
      }
    });
    return tagsArr;
  };

  toggleSearch = (nextVal: boolean = false) => {
    this.showSearch.next(nextVal);
  };

  emitSearch(payload: { type: string; value?: TagInner }) {
    this.searchEmmiter.next(payload);
  }
}
