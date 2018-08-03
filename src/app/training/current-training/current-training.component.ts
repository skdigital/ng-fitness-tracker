import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

// Sub component
import { StopTrainingComponent } from "./stop-training/stop-training.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter<void>();

  progress = 0;
  timer;

  constructor(private _dialog: MatDialog, _router: Router) { }

  ngOnInit() {
    this.startOrResumeTime();
  }

  startOrResumeTime() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this._dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTime();
        this._dialog.closeAll();
      }
    })
  }

}
