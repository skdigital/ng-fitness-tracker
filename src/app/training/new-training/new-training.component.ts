import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private _trainingService: TrainingService,
    private _afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.exercises = this._trainingService.getAvailableExercises();
    this.exerciseSubscription = this._trainingService.availableExercisesChanged
      .subscribe(exercises => this.exercises = exercises);
  }


  onStartTraining(form: NgForm) {
    this._trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
