import { Teacher } from './../teacher.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.styl'],
})
export class TeacherCardComponent implements OnInit {
  @Input() teacher: Teacher;

  constructor() {}

  ngOnInit() {}
}
