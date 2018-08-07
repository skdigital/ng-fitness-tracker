import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {

  public authChange = new Subject<boolean>();
  private isAuthenticated: Boolean = false;

  constructor(
    private _router: Router,
    private _afAuth: AngularFireAuth,
    private _trainingService: TrainingService
  ) { }

  initAuthListener() {
    this._afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this._router.navigate(['/training']);
      } else {
        this._trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this._router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this._afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this._router.navigate(['/training']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this._afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        this._router.navigate(['/training']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this._afAuth.auth.signOut();
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
