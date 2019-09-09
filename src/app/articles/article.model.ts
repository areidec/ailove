import { CourseCard } from '../courses/shared/course-card.model';

class Hashtag {
  constructor(public name: string, public id: number) {}
}

class ArticleContent {
  constructor(
    public image: string,
    public title: string,
    public text: string,
    public hashtags: Hashtag[],
  ) {}
}

class ArticleData {
  constructor(public date: string, public activity: ArticleActivity) {}
}

class ArticleActivity {
  constructor(public likes: number, public comments: number) {}
}

// export class ArticleFilter {
//   constructor(public id: number, public text: string) {}
// }

export interface ArticleFilter {
  id: number;
  text: string;
}

export class Article {
  constructor(
    public id: number,
    public filters: ArticleFilter[],
    public content: ArticleContent,
    public data: ArticleData,
  ) {}
}

export class SlugMapEl {
  constructor(public id: number, public filter: string) {}
}

export class State {
  public id: number;
  public base: string;

  public constructor(fields?: { id?: number; base?: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class CurrentArticle {
  public author: { name: string; image: string };
  public category: ArticleFilter;
  public content: string;
  public comments: any[];
  public created_at: string;
  public description: string;
  public number_of_likes: string;
  public number_of_comments: string;
  public poster_image: string;
  public related_course: CourseCard;
  public tags: any[];
  public title: string;
  public filters?: ArticleFilter[];
  public preview_image: string;
  public slug: string;
  public id: number;
  public constructor(fields: {
    author: { name: string; image: string };
    category: ArticleFilter;
    content: string;
    comments: any[];
    created_at: string;
    description: string;
    number_of_likes: string;
    poster_image: string;
    related_course: CourseCard;
    tags: any[];
    title: string;
    id: number;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
