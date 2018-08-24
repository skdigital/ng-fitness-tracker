import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Exercise} from './exercise.model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {UIService} from '../shared/global-ui/ui.service';
import * as fromRoot from '../app.reducer';
import {Store} from '@ngrx/store';
import {StartLoading, StopLoading} from '../shared/ui.actions';

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = []; // all available exercises currently listed in fire-store.
  private runningExercise: Exercise; // the currently running or active exercise.

  private fbSubs: Subscription[] = []; // used for un-subscribing on logout.

  constructor(
    private _afs: AngularFirestore,
    private _uiService: UIService,
    private _store: Store<fromRoot.State>
  ) {
  }

  // fetch available types of exercises from firestore
  fetchAvailableExercises() {
    this._store.dispatch(new StartLoading());
    this.fbSubs.push(this._afs
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()[ 'name' ],
              duration: doc.payload.doc.data()[ 'duration' ],
              calories: doc.payload.doc.data()[ 'calories' ]
            };
          });
        }))
      .subscribe((exercises: Exercise[]) => {
        this._store.dispatch(new StopLoading());
        this.availableExercises = exercises;
        this.availableExercisesChanged.next([ ...this.availableExercises ]);
      }, error1 => {
        this._store.dispatch(new StopLoading());
        this._uiService.showSnackBar('Fetching Exercises failed, please try again later.', 'Error', 5000);
      }));
  }

  // fetch finished / completed exercises from firestore
  fetchFinishedExercises() {
    this.fbSubs.push(this._afs
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExerciseChanged.next(exercises);
      }));
  }

  getAvailableExercises() {
    return [ ...this.availableExercises ];
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
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getActiveExercise() {
    return {...this.runningExercise};
  }

  private addDataToDatabase(exercise: Exercise) {
    this._afs.collection('finishedExercises').add(exercise);
  }

  // utilities helper methods
  // is used for un-subscribing when logging out
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
