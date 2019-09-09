import { StateService } from 'src/app/main/main.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';

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

  ngOnInit() {}

  sendFeedback() {
    if (this.feedBackForm.valid) {
      this.httpClient.post('/api/common/feedback/question', this.feedBackForm.value).subscribe(
        () => this.dialogRef.close(),
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
}
