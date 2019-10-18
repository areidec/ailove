import { Component, OnInit, HostListener } from '@angular/core';
import { DialogFeedbackComponent } from '../dialog/feedback/feedback.component';
import { MatDialog } from '@angular/material';
import {DialogLoginComponent} from '../dialog/login/dialog-login.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl'],
})
export class FooterComponent implements OnInit {
  mobileResolution: boolean;
  constructor(public dialog: MatDialog) {}

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

  openDialog(): void {
    if (this.mobileResolution) {
      const dialogRef = this.dialog.open(DialogFeedbackComponent, {
        width: '100vw',
        maxWidth: '100vw',
        height: 'auto',
        minHeight: '100vh',
        position: {top: '0px'}
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else {
      const dialogRef = this.dialog.open(DialogFeedbackComponent, {
        width: '28.125vw',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }

}
