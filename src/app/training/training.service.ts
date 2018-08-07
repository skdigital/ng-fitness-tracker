import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Exercise} from './exercise.model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = []; // all available exercises currently listed in fire-store
  private runningExercise: Exercise; // the currently running or active exercise

  constructor(private _afs: AngularFirestore) {
    this.fetchAvailableExercises();
    this.fetchFinishedExercises();
  }

  // fetch available types of exercises from firestore
  fetchAvailableExercises() {
    this._afs.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories']
            };
          });
        }))
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.availableExercises = exercises;
        this.availableExercisesChanged.next([...this.availableExercises]);
      });
  }

  // fetch finished / completed exercises from firestore
   fetchFinishedExercises() {
    this._afs.collection('finishedExercises').valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExerciseChanged.next(exercises);
      });
  }

  getAvailableExercises() {
    return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getActiveExercise() {
    return {...this.runningExercise};
  }

  private addDataToDatabase(exercise: Exercise) {
    this._afs.collection('finishedExercises').add(exercise);
  }
}
