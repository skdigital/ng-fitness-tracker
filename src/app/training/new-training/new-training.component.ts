import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  trainingId: string;
  availableExercises: Array<Exercise>;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercises = this._trainingService.getExercises();
  }

  onStartTraining (form: NgForm) {
    this._trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }
}
