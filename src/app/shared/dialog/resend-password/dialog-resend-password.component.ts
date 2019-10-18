import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { DialogResendPasswordSuccessComponent } from './../resend-password-success/dialog-resend-password-success.component';
import { StateService } from 'src/app/main/main.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { fade } from 'src/app/courses/shared/animations.service';

@Component({
  selector: 'app-dialog-resend-password',
  templateUrl: './dialog-resend-password.component.html',
  styleUrls: ['./dialog-resend-password.component.styl'],
  animations: [fade],
})
export class DialogResendPasswordComponent implements OnInit {
  mobileResolution = true;
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public errorsArr: string[] = [];

  get email() {
    return this.form.get('email');
  }

  constructor(
    public dialogRef: MatDialogRef<DialogResendPasswordComponent>,
    public stateService: StateService,
    public dialog: MatDialog,
  ) {}

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

  onSubmit(): void {
    if (this.form.valid) {
      this.stateService.restorePassword(this.form.get('email').value).subscribe(
        () => {
          if ( this.mobileResolution) {
            this.dialogRef.close();
            this.dialog.open(DialogResendPasswordSuccessComponent, {
              width: '100vw',
              maxWidth: '100vw',
              height: 'auto',
              minHeight: '196px',
              position: {top: '0px'},
              data: { email: this.form.get('email').value },
            });
          } else {
            this.dialogRef.close();
            this.dialog.open(DialogResendPasswordSuccessComponent, {
              width: '28.125vw',
              data: { email: this.form.get('email').value },
            });
          }
        },
        (err) => {
          this.errorsArr = err;
        },
      );
    } else {
      return;
    }
  }
  // for test callback form
  // onTest():void {
  //   if ( this.mobileResolution) {
  //     this.dialogRef.close();
  //     this.dialog.open(DialogResendPasswordSuccessComponent, {
  //       width: '100vw',
  //       maxWidth: '100vw',
  //       height: 'auto',
  //       minHeight: '196px',
  //       position: {top: '0px'},
  //       data: { email: this.form.get('email').value },
  //     });
  //   } else {
  //     this.dialogRef.close();
  //     this.dialog.open(DialogResendPasswordSuccessComponent, {
  //       width: '28.125vw',
  //       data: { email: this.form.get('email').value },
  //     });
  //   }
  // }

}
