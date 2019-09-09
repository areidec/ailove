import { fade } from './../shared/animations.service';
import { State } from './../../main/state.model';
import { StateService } from './../../main/main.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.styl'],
  animations: [fade],
})
export class TopPartComponent implements OnInit {
  currentState: State = new State({ id: 0, base: '' });
  bgClass: string;
  userLogined = false;

  constructor(private stateService: StateService) {
    this.currentState = stateService.getCurrentState();
    stateService.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });

    stateService.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });

    stateService.checkUser();
  }

  @HostListener('window:resize')
  onResize() {
    this.bgClass = window.innerWidth / window.innerHeight > 16 / 9 ? 'wide' : 'narrow';
  }

  ngOnInit() {
    this.onResize();
  }
}
