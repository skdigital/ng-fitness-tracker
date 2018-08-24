import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {Observable, Subscription} from 'rxjs';
import {UIService} from '../../shared/global-ui/ui.service';
import {Store} from '@ngrx/store';
import * as appRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  isLoading$: Observable<any>;

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private _trainingService: TrainingService,
    private _uiService: UIService,
    private _store: Store<appRoot.State>
  ) { }

  ngOnInit() {
    // loading UI feature
    this.isLoading$ = this._store.select(appRoot.getUiState);

    // fetch exercises on init
    this.exerciseSubscription = this._trainingService.availableExercisesChanged
      .subscribe(exercises => this.exercises = exercises);

    this.fetchExercises();
  }

  fetchExercises() {
    this._trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this._trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }
}
