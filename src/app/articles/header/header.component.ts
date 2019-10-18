import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { StateService } from 'src/app/main/main.service';
import { State } from 'src/app/main/state.model';
import { fade, slideIn } from 'src/app/courses/shared/animations.service';
import { RegistrationService } from 'src/app/shared/registration/registration.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from 'src/app/shared/dialog/login/dialog-login.component';

@Component({
  selector: 'app-articles-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  animations: [fade, slideIn],
})
export class HeaderComponent implements OnInit {
  currentState: State;
  loginModal = false;
  userLogined = false;
  showRegistration = false;
  animal: string;
  name: string;
  burgerState = false;
  private toggleRegistration: (nextVal: boolean) => void;
  mobileResolution: boolean;

  constructor(
    private mainState: StateService,
    private registrationState: RegistrationService,
    public dialog: MatDialog,
  ) {
    mainState.activeState.subscribe((payload: State) => {
      this.currentState = payload;
    });

    mainState.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });

    mainState.checkUser();

    // registration
    registrationState.showRegistrationSubject.subscribe((payload: boolean) => {
      this.showRegistration = payload;
    });
    registrationState.registrationDoneObs.subscribe((payload: boolean) => {
      if (payload) {
        this.mainState.getUserCourseAndInfo();
      }
    });
    this.toggleRegistration = (nextVal) => registrationState.toggleRegistration(nextVal);
  }

  @HostListener('window:resize') onResize() {
    window.innerWidth < 768 ? this.mobileResolution = true : this.mobileResolution = false;
  }

  ngOnInit() {
    this.onResize();
  }

  openDialog(): void {
    if (this.mobileResolution) {
      const dialogRef = this.dialog.open(DialogLoginComponent, {
        width: '100vw',
        maxWidth: '100vw',
        height: 'auto',
        minHeight: '358px',
        position: {top: '0px'}
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else {
        const dialogRef = this.dialog.open(DialogLoginComponent, {
          width: '28.125vw',
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
        });
    }

  }

  changeState(id: number): void {
    if (this.currentState.id !== id) {
      this.mainState.setActiveState(id);
    }
  }

  logoutUser() {
    this.mainState.logoutUser();
  }

  defineCssState() {
    return this.currentState
      ? {
          initial: this.currentState.id === 0,
          courses: this.currentState.id === 1,
          articles: this.currentState.id === 2,
        }
      : {
          initial: true,
        };
  }

  private burgerToggleState() {
    this.burgerState = !this.burgerState;
  }

  private isMobile(): string {
    if (window.innerWidth < 768 && !this.userLogined) return 'short';
  }

}
