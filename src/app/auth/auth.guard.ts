import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private _authService: AuthService, private _router: Router) {}

    // not using
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAuth()) {
            return true;
        } else {
            this._router.navigate(['/login']);
        }
    }

    // using when lazy loading
    canLoad(route: Route) {
      if (this._authService.isAuth()) {
        return true;
      } else {
        this._router.navigate(['/login']);
      }
    }
}
