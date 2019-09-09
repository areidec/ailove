import { DialogResendPasswordComponent } from './../resend-password/dialog-resend-password.component';
import { StateService } from 'src/app/main/main.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.styl'],
})
export class DialogLoginComponent {
  email: string;
  password: string;
  public errorsArr: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    public stateService: StateService,
    public dialog: MatDialog,
  ) {}

  loginUser() {
    this.stateService.loginUser(this.email, this.password).subscribe(
      (res) => {
        console.log('res: ', res);
      },
      (err) => {
        this.errorsArr = err;
      },
    );
  }

  openResendPassword(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogResendPasswordComponent, {
      width: '28.125vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
