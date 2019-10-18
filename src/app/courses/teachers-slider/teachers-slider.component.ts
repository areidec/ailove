import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TeachersService } from './../teachers/teachers.service';
import {Teacher} from '../teachers/teacher.model';

@Component({
  selector: 'app-teachers-slider',
  templateUrl: './teachers-slider.component.html',
  styleUrls: ['./teachers-slider.component.styl']
})
export class TeachersSliderComponent implements OnInit, AfterViewInit {
  teachers: Teacher[];
  mobileResolution: boolean;
  slideConfig = {arrows: false, dots: true,};

  constructor(private teachersService: TeachersService) {
    this.teachers = teachersService.getTeachersFromApi();
  }

  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;

  }


  ngOnInit() {
    this.onResize();
  }

  ngAfterViewInit() { }

}
