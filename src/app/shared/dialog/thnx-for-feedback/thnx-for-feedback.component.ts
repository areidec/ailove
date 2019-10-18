import { StateService } from 'src/app/main/main.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fade } from 'src/app/courses/shared/animations.service';

@Component({
  selector: 'app-thnx-for-feedback',
  templateUrl: './thnx-for-feedback.component.html',
  styleUrls: ['./thnx-for-feedback.component.styl'],
  animations: [fade],
})
export class ThnxForFeedbackComponent {
  constructor(
    public dialogRef: MatDialogRef<ThnxForFeedbackComponent>,
    public stateService: StateService,
  ) {}
}
