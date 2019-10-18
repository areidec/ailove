import { DialogResendPasswordComponent } from './../resend-password/dialog-resend-password.component';
import { StateService } from 'src/app/main/main.service';
import {Component, HostListener, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../../registration/registration.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.styl'],
})
export class DialogLoginComponent implements OnInit {
  email: string;
  password: string;
  public errorsArr: string[] = [];
  showRegistration = false;
  animal: string;
  name: string;
  mobileResolution = true;
  private toggleRegistration: (nextVal: boolean) => void;
  constructor(
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    public stateService: StateService,
    public dialog: MatDialog,
    private registrationState: RegistrationService,
  ) {
    // registration
    registrationState.showRegistrationSubject.subscribe((payload: boolean) => {
      this.showRegistration = payload;
    });
    registrationState.registrationDoneObs.subscribe((payload: boolean) => {
      if (payload) {
        this.stateService.getUserCourseAndInfo();
      }
    });
    this.toggleRegistration = (nextVal) => {
      this.dialogRef.close();
      return registrationState.toggleRegistration(nextVal);
    };
  }

  @HostListener('window:resize') onResize() {
    if (window.innerWidth < 768) {
      this.mobileResolution = true;
    } else {
      this.mobileResolution = false;
    }
  }

  ngOnInit() {
    this.onResize();
  }

  loginUser() {
    console.log('login user');
    this.stateService.loginUser(this.email, this.password).subscribe(
      (res) => {
        this.dialogRef.close();
        console.log('res: ', res);
      },
      (err) => {
        console.log('res: ');
        this.errorsArr = err;
      },
    );
  }

  openResendPassword(): void {
    if ( this.mobileResolution ) {
      this.dialogRef.close();
      const dialogRef = this.dialog.open(DialogResendPasswordComponent, {
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
      this.dialogRef.close();
      const dialogRef = this.dialog.open(DialogResendPasswordComponent, {
        width: '28.125vw',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }
}
