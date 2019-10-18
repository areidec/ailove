import { StateService } from 'src/app/main/main.service';
import {Component, HostListener, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import {ThnxForFeedbackComponent} from '../thnx-for-feedback/thnx-for-feedback.component';

@Component({
  selector: 'app-dialog-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.styl'],
})
export class DialogFeedbackComponent implements OnInit {
  public feedBackForm: FormGroup;
  email: string;
  password: string;
  topics: Observable<{ id: number; text: string }[]>;
  public errorsArr: string[] = [];
  mobileResolution: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogFeedbackComponent>,
    public stateService: StateService,
    public dialog: MatDialog,
    public httpClient: HttpClient,
  ) {
    const defaultValidators = [Validators.required, Validators.minLength(1)];

    this.feedBackForm = new FormGroup({
      name: new FormControl('', defaultValidators),
      email: new FormControl('', defaultValidators),
      topic: new FormControl('', defaultValidators),
      question: new FormControl('', defaultValidators),
    });

    this.topics = httpClient
      .get('/api/common/feedback/topics')
      .pipe(map((res: { id: number; text: string }[]) => res));
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

  sendFeedback() {
    if (this.feedBackForm.valid) {
      this.httpClient.post('/api/common/feedback/question', this.feedBackForm.value).subscribe(
        () => {
          if(this.mobileResolution) {
            this.dialogRef.close()
            const thnxDialog = this.dialog.open(ThnxForFeedbackComponent, {
              width: '100vw',
              maxWidth: '100vw',
              height: 'auto',
              minHeight: '194px',
              position: {top: '0px'}
            });
          } else {
            this.dialogRef.close()
            const thnxDialog = this.dialog.open(ThnxForFeedbackComponent, {
              width: '28.125vw',
            });
          }
        },
        (err) => {
          const {
            error: { validation_errors },
          } = err;
          const errorsArr = [];
          Object.keys(validation_errors).forEach((el) =>
            errorsArr.push([...validation_errors[el]]),
          );
          this.errorsArr = errorsArr;
        },
      );
    }
  }

  testMethood() {
    if(this.mobileResolution) {
      this.dialogRef.close()
      const thnxDialog = this.dialog.open(ThnxForFeedbackComponent, {
        width: '100vw',
        maxWidth: '100vw',
        height: 'auto',
        minHeight: '194px',
        position: {top: '0px'}
      });
    } else {
      this.dialogRef.close()
      const thnxDialog = this.dialog.open(ThnxForFeedbackComponent, {
        width: '28.125vw',
      });
    }
  }

}
