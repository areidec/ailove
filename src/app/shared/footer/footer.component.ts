import { Component, OnInit } from '@angular/core';
import { DialogFeedbackComponent } from '../dialog/feedback/feedback.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl'],
})
export class FooterComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFeedbackComponent, {
      width: '28.125vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
