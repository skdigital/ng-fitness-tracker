import { Component, OnInit } from '@angular/core';
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

    // Custom service with text to speech voice output
    this._textToSpeech.newVoiceMessage('Training Started');

    const step = this._trainingService.getActiveExercise().duration / 100 * 1000;
    console.log(step);
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {

        this._textToSpeech.newVoiceMessage('Exercise completed!');

        this._trainingService.completeExercise();
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
        this._trainingService.cancelExercise(this.progress);
        this._textToSpeech.newVoiceMessage('Training Cancelled')
      } else {
        this.startOrResumeTime();
        this._dialog.closeAll();
      }
    });
  }

}
