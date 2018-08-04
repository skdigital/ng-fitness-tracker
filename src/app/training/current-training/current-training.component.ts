import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import {TrainingService} from '../training.service';
import {TextToSpeechService} from '../../services/text-speech/text-speech.service';
// Sub component
import { StopTrainingComponent } from './stop-training/stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter<void>();

  progress = 0;
  timer;

  constructor(
    private _dialog: MatDialog,
    private _trainingService: TrainingService,
    private _textToSpeech: TextToSpeechService
  ) { }

  ngOnInit() {
    this.startOrResumeTime();
  }

  startOrResumeTime() {

    this._textToSpeech.newVoiceMessage('Training Start', 'en-GB');

    const step = this._trainingService.getActiveExercise().duration / 100 * 1000;
    console.log(step);
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step);
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
    });
  }

}
