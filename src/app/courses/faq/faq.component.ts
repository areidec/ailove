import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogFeedbackComponent } from 'src/app/shared/dialog/feedback/feedback.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.styl'],
})
export class FaqComponent implements OnInit {
  questions = [
    {
      title: 'Сколько времени занимает обучение?',
      about:
        'Практика показывает, что программе нужно посвящать от 1 до 3 часов в неделю. Вся программа рассчитана на пять месяцев.',
    },
    {
      title: 'Сколько это стоит?',
      about: 'Это бесплатно и будет бесплатно всегда.',
    },
    {
      title: 'Получу ли я какое-то подтверждение прохождения курса?',
      about:
        'Да. После успешного прохождения итогового теста вы получите персональный электронный сертификат.',
    },
    {
      title: 'Зачем Google и Cбербанк создали такой проект?',
      about:
        'Стратегические приоритеты обеих компаний — создание новых возможностей для экономического развития страны. Так в 2016 году появилась программа Google и Сбербанка для действующих и потенциальных предпринимателей: мы знакомим широкую аудиторию с новейшими методиками, позволяющими развивать бизнес, и делаем это с помощью передовых технологий.',
    },
  ];
  finHeight: string;
  activeLi: number;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  expand(index: number, { clientHeight }: HTMLElement) {
    this.activeLi = this.activeLi === index ? -1 : index;
    this.finHeight = clientHeight + window.innerWidth * 0.07 + 'px';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFeedbackComponent, {
      width: '28.125vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
