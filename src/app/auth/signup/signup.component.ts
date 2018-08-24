import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {UIService} from '../../shared/global-ui/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {

  maxDate;
  loadingState$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private _uiService: UIService,
    private _store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.loadingState$ = this._store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // Sign up
  onSubmit(form: NgForm) {
    if ( form ) {
      this._authService.registerUser({
        email: form.value.email,
        password: form.value.password
      });
    }
  }
}
