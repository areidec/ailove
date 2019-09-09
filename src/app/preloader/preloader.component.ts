import { Component, OnInit } from '@angular/core';
import lottie, { AnimationConfigWithData } from 'lottie-web';
import { ad } from './animationData'


@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.styl']
})
export class PreloaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const params: AnimationConfigWithData = {
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ad,
    };

    lottie.loadAnimation(params);
  }

}
