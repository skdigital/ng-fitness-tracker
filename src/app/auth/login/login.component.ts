import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/global-ui/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  loadingSubscription: Subscription;
  loadingState: Boolean = false;

  constructor(
    private _authService: AuthService,
    private  _uiService: UiService
  ) {
  }

  ngOnInit() {
    this.loadingSubscription = this._uiService.loadingStateChanged.subscribe(isLoading => {
      this.loadingState = isLoading;
    });

    // Login Form Group with Validation
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    if (this.loginForm) {
      this._authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      });
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
