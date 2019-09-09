import { StateService } from 'src/app/main/main.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fade } from 'src/app/courses/shared/animations.service';

@Component({
  selector: 'app-dialog-resend-password-success',
  templateUrl: './dialog-resend-password-success.component.html',
  styleUrls: ['./dialog-resend-password-success.component.styl'],
  animations: [fade],
})
export class DialogResendPasswordSuccessComponent {
  email: string;
  success = false;
  constructor(
    public dialogRef: MatDialogRef<DialogResendPasswordSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public stateService: StateService,
  ) {}
}
