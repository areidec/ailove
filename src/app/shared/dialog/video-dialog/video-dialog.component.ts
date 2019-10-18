import { StateService } from 'src/app/main/main.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fade } from 'src/app/courses/shared/animations.service';
import { DomSanitizer} from '@angular/platform-browser';
import { RegistrationService } from 'src/app/shared/registration/registration.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.styl'],
  animations: [fade]
})
export class VideoDialogComponent implements OnInit {
  url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  userLogined = false;
  showRegistration = false;
  private toggleRegistration: (nextVal: boolean) => void;

  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    public stateService: StateService,
    private sanitizer: DomSanitizer,
    private registrationState: RegistrationService,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }
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
    this.toggleRegistration = (nextVal) => registrationState.toggleRegistration(nextVal);

    stateService.userLogined.subscribe((payload: boolean) => {
      this.userLogined = payload;
    });

    stateService.checkUser();

  }

  ngOnInit() { }

}
