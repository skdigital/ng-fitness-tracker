import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAuth()){
            return true;
        } else {
            this._router.navigate(['/login'])
        }
    }
}