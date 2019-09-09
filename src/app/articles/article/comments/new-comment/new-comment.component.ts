import { CurrentArticle } from './../../../article.model';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from './../../../articles.service';
import { StateService } from 'src/app/main/main.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/courses/shared/course-card.model';
import { DialogLoginComponent } from 'src/app/shared/dialog/login/dialog-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.styl'],
})
export class NewCommentComponent implements OnInit {
  userInfo: UserInfo;
  commentText = '';
  currentArticle: CurrentArticle;
  userLogined = false;

  constructor(
    private stateService: StateService,
    private articleService: ArticlesService,
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) {
    if (stateService.checkUser()) {
      this.userLogined = true;
      this.userInfo = stateService.getUserInfo();
    }
    articleService.currentArticleSubscribe.subscribe((payload: CurrentArticle) => {
      this.currentArticle = payload;
    });
  }

  ngOnInit() {}

  checkComment() {
    return this.commentText.replace(/ /g, '').length === 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '28.125vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.stateService.checkUser()) {
        this.userLogined = true;
        this.userInfo = this.stateService.getUserInfo();
      }
    });
  }

  sendComment() {
    this.httpClient
      .post(`/api/articles/${this.currentArticle.id}/comment`, { content: this.commentText })
      .subscribe((res) => {
        this.articleService.refreshComments();
        this.commentText = '';
      });
  }
}
