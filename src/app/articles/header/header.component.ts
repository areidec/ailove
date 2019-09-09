import { Component, OnInit, Inject } from '@angular/core';
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
  private toggleRegistration: (nextVal: boolean) => void;

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

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '28.125vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  changeState(id: number): void {
    if (this.currentState.id !== id) {
      this.mainState.setActiveState(id);
    }
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
}
