import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
const t3d = ' translateZ(0px) perspective(1px)';
export const animation = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(5%)' + t3d }),
    animate(
      '0.45s cubic-bezier(0.215, 0.61, 0.355, 1)',
      style({ opacity: 1, transform: 'translateY(0%)' + t3d }),
    ),
  ]),
  transition(':leave', [
    animate(
      '0.45s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      style({ opacity: 0, transform: 'translateY(-5%)' + t3d }),
    ),
  ]),
]);

export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0, transform: t3d }),
    animate(
      '0.45s 0.45s cubic-bezier(0.215, 0.61, 0.355, 1)',
      style({ opacity: 1, transform: t3d }),
    ),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: t3d }),
    animate('0.45s cubic-bezier(0.55, 0.055, 0.675, 0.19)', style({ opacity: 0, transform: t3d })),
  ]),
]);

export const courseFade = trigger('courseFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(50%)' + t3d }),
    animate(
      '0.45s cubic-bezier(0.215, 0.61, 0.355, 1)',
      style({ opacity: 1, transform: 'translateY(0%)' + t3d }),
    ),
  ]),
  transition(':leave', [
    animate(
      '0.45s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      style({ opacity: 0, transform: 'translateY(50%)' + t3d }),
    ),
  ]),
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    query('.z-index-comp', [
      style({ zIndex: -2, opacity: 0 }),
      animate('0s ease', style({ zIndex: 99, opacity: 1 })),
    ]),
    query('.slide-in-comp', [
      style({ opacity: 0, transform: `translateX(10vw) ${t3d}` }),
      animate('0.35s cubic-bezier(0.215, 0.61, 0.355, 1)', style({ opacity: 1, transform: t3d })),
    ]),
  ]),
  transition(':leave', [
    query('.slide-in-comp', [
      style({ opacity: 1, transform: t3d }),
      animate(
        '0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        style({ opacity: 0, transform: `translateX(10vw) ${t3d}` }),
      ),
    ]),
    query('.z-index-comp', [
      style({ zIndex: 99, opacity: 1 }),
      animate('0.25s ease', style({ zIndex: -2, opacity: 0 })),
    ]),
  ]),
]);

export const slideInTop = trigger('slideInTop', [
  transition(':enter', [
    query('.z-index-comp', [
      style({ zIndex: -2, opacity: 0 }),
      animate('0s ease', style({ zIndex: 99, opacity: 1 })),
    ]),
    query('.slide-in-comp', [
      style({ opacity: 0, transform: `translateY(-15vw) ${t3d}` }),
      animate('0.35s cubic-bezier(0.215, 0.61, 0.355, 1)', style({ opacity: 1, transform: t3d })),
    ]),
  ]),
  transition(':leave', [
    query('.slide-in-comp', [
      style({ opacity: 1, transform: t3d }),
      animate(
        '0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        style({ opacity: 0, transform: `translateY(-15vw) ${t3d}` }),
      ),
    ]),
    query('.z-index-comp', [
      style({ zIndex: 99, opacity: 1 }),
      animate('0.25s ease', style({ zIndex: -2, opacity: 0 })),
    ]),
  ]),
]);

export const slideInBottom = trigger('slideInBottom', [
  transition(':enter', [
    query('.z-index-comp', [
      style({ zIndex: -2, opacity: 0 }),
      animate('0s ease', style({ zIndex: 99, opacity: 1 })),
    ]),
    query('.slide-in-comp', [
      style({ opacity: 0, transform: `translateY(5vw) ${t3d}` }),
      animate('0.75s cubic-bezier(0.215, 0.61, 0.355, 1)', style({ opacity: 1, transform: t3d })),
    ]),
  ]),
  transition(':leave', [
    query('.slide-in-comp', [
      style({ opacity: 1, transform: t3d }),
      animate(
        '0.45s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        style({ opacity: 0, transform: `translateY(5vw) ${t3d}` }),
      ),
    ]),
    query('.z-index-comp', [
      style({ zIndex: 99, opacity: 1 }),
      animate('0.45s ease', style({ zIndex: -2, opacity: 0 })),
    ]),
  ]),
]);
