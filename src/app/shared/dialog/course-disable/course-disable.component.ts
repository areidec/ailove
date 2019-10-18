import { StateService } from 'src/app/main/main.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../../registration/registration.service';

@Component({
  selector: 'app-course-disable',
  templateUrl: './course-disable.component.html',
  styleUrls: ['./course-disable.component.styl'],
})
export class DialogCourseDisableComponent {
  email: string;
  password: string;
  public errorsArr: string[] = [];
  showRegistration = false;
  animal: string;
  name: string;
  constructor(
    public dialogRef: MatDialogRef<DialogCourseDisableComponent>,
    public stateService: StateService,
    public dialog: MatDialog,
  ) {}

  continue() {
    window.location.href = 'https://www.business-class.pro/modules';
  }
}
