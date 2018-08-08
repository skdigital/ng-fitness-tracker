import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/global-ui/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  loadingStateSub: Subscription;
  loadingState: Boolean = false;

  constructor(private _authService: AuthService, private _uiService: UIService) {
  }

  ngOnInit() {

    this.loadingStateSub = this._uiService.loadingStateChanged.subscribe(isLoading => {
      this.loadingState = isLoading;
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // Signup
  onSubmit(form: NgForm) {
    if (form) {
      this._authService.registerUser({
        email: form.value.email,
        password: form.value.password
      });
    }
  }

  ngOnDestroy() {
    if ( this.loadingStateSub ) {
      this.loadingStateSub.unsubscribe();
    }
  }

}
