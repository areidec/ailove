import { TeachersService } from './courses/teachers/teachers.service';
import { CourseCardsService } from './courses/shared/course-cards.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material IO
import {
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatCheckboxModule,
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { CoursesComponent } from './courses/courses.component';
import { CategoryComponent } from './articles/category/category.component';
import { MainComponent } from './main/main.component';
import { StateService } from './main/main.service';
import { CardComponent } from './articles/card/card.component';
import { HeaderComponent } from './articles/header/header.component';
import { DialogLoginComponent } from './shared/dialog/login/dialog-login.component';
import { DialogFeedbackComponent } from './shared/dialog/feedback/feedback.component';
import { DialogResendPasswordComponent } from './shared/dialog/resend-password/dialog-resend-password.component';
import { DialogResendPasswordSuccessComponent } from './shared/dialog/resend-password-success/dialog-resend-password-success.component';
import { FilterComponent } from './articles/filter/filter.component';
import { TopPartComponent } from './courses/top-part/top-part.component';
import { InitialComponent } from './courses/top-part/initial/initial.component';
import { CourseSelectComponent } from './courses/top-part/course-select/course-select.component';
import { CourseCardComponent } from './courses/top-part/initial/course-card/course-card.component';
import { CourseSelectCardComponent } from './courses/top-part/course-select/course-select-card/course-select-card.component';
import { CourseSelectInfoComponent } from './courses/top-part/course-select/course-select-card/course-select-info/course-select-info.component';
import { TeachersComponent } from './courses/teachers/teachers.component';
import { TeacherCardComponent } from './courses/teachers/teacher-card/teacher-card.component';
import { UserCourseComponent } from './courses/top-part/user-course/user-course.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { ArticlesWrapComponent } from './articles/articles-wrap/articles-wrap.component';
import { ArticleComponent } from './articles/article/article.component';

import { NgxMaskModule } from 'ngx-mask';
import { RegistrationService } from './shared/registration/registration.service';
import { CommentsComponent } from './articles/article/comments/comments.component';
import { NewCommentComponent } from './articles/article/comments/new-comment/new-comment.component';
import { FaqComponent } from './courses/faq/faq.component';
import { SearchComponent } from './articles/filter/search/search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    CoursesComponent,
    CategoryComponent,
    MainComponent,
    CardComponent,
    HeaderComponent,
    FilterComponent,
    TopPartComponent,
    InitialComponent,
    CourseSelectComponent,
    CourseCardComponent,
    CourseSelectCardComponent,
    CourseSelectInfoComponent,
    TeachersComponent,
    TeacherCardComponent,
    UserCourseComponent,
    RegistrationComponent,
    DialogLoginComponent,
    DialogFeedbackComponent,
    DialogResendPasswordComponent,
    DialogResendPasswordSuccessComponent,
    ArticlesWrapComponent,
    ArticleComponent,
    CommentsComponent,
    NewCommentComponent,
    FaqComponent,
    SearchComponent,
    FooterComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatChipsModule,
  ],
  providers: [
    StateService,
    CookieService,
    CourseCardsService,
    TeachersService,
    MatDatepickerModule,
    RegistrationService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogFeedbackComponent,
    DialogLoginComponent,
    DialogResendPasswordComponent,
    DialogResendPasswordSuccessComponent,
  ],
})
export class AppModule {}
