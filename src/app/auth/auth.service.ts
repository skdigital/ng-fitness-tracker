import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

    public authChange = new Subject<boolean>();
    private user: User;

    constructor(private _router: Router) { }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccess();
        this.consoleLogAuthState();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccess();
        this.consoleLogAuthState();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this._router.navigate(['/login']);
        this.consoleLogAuthState();
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    // 1. sets the authstate subject to true
    // 2. navigates to /training
    private authSuccess() {
        this.authChange.next(true);
        this._router.navigate(['/training']);
    }

    // helper method for debugging authstate state
    // console logs the authstate when called.
    private consoleLogAuthState() {
        this.authChange.subscribe((data) => {
            console.log(`User is authenticated: ${data}`);
        });
    }
}
