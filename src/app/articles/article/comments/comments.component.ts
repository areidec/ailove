import { Component, OnInit, Input } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.styl'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: [];

  constructor() {}

  ngOnInit() {}

  formatDate(date: string) {
    const formatDate = date.split('-').map((el) => parseInt(el, 10));
    return format(new Date(formatDate[0], formatDate[1] - 1, formatDate[2]), 'D MMMM YYYY');
  }
}
