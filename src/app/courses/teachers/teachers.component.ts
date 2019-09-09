import { TeachersService } from './teachers.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from './teacher.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.styl'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[];
  constructor(private teachersService: TeachersService) {
    this.teachers = teachersService.getTeachersFromApi();
  }

  ngOnInit() {}
}
