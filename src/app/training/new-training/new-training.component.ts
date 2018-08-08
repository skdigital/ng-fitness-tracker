import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/global-ui/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  isLoadingSub: Subscription;
  isLoading: Boolean = false;

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private _trainingService: TrainingService,
    private _uiService: UIService
  ) { }

  ngOnInit() {
    // loading UI feature
    this.isLoadingSub = this._uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
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

  ngOnDestroy() {
    if ( this.exerciseSubscription ) {
      this.exerciseSubscription.unsubscribe();
    }
    if ( this.isLoadingSub ) {
      this.isLoadingSub.unsubscribe();
    }
  }
}
