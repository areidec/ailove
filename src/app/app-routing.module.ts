import { ArticleComponent } from './articles/article/article.component';
import { ArticlesWrapComponent } from './articles/articles-wrap/articles-wrap.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ArticlesWrapComponent,
      },
      {
        path: ':slug',
        component: ArticleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
