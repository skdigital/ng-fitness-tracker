import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UIService} from '../shared/global-ui/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {

  public authChange = new Subject<boolean>();
  private isAuthenticated: Boolean = false;

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private _uiService: UIService,
    private _store: Store<fromRoot.State>
  ) {
  }

  initAuthListener() {
    this._afAuth.authState.subscribe(user => {
      if ( user ) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this._router.navigate([ '/training' ]);
      } else {
        this._trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this._router.navigate([ '/login' ]);
      }
    });
  }

  registerUser(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this._router.navigate([ '/training' ]);
        this._store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this._store.dispatch({type: 'STOP_LOADING'});
        this._uiService.showSnackBar(error.message, 'Error', 5000);
      });
  }

  login(authData: AuthData) {
    this._store.dispatch(new UI.StartLoading());
    this._afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this._store.dispatch(new UI.StopLoading());
        this._router.navigate([ '/training' ]);
      })
      .catch(error => {
        this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(error.message, 'Error', 5000);
      });
  }

  logout() {
    this._afAuth.auth.signOut();
    this._uiService.showSnackBar('You have logged out.', 5000);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  // helper method for debugging authstate state
  // console logs the authstate when called.
  consoleLogAuthState() {
    this.authChange.subscribe((data) => {
      console.log(`User is authenticated: ${data}`);
    });
  }
}
