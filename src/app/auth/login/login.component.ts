import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../shared/global-ui/ui.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import 'rxjs-compat/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private  _uiService: UIService,
    private _store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    // observable global store approach for loading state
    this.isLoading$ = this._store.select(fromRoot.getIsLoading);
    // Login Form Group with Validation
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [ Validators.required, Validators.email ]
      }),
      password: new FormControl('', {validators: [ Validators.required ]})
    });
  }

  onSubmit() {
    if ( this.loginForm ) {
      this._authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      });
    }
  }
}
