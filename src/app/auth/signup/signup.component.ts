import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // signup
  onSubmit(form: NgForm) {
    if(form){
      this._authService.registerUser({
        email: form.value.email,
        password: form.value.password
      })
    }
  }

}
