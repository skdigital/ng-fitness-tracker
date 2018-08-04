import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this._authService.authChange.subscribe((data) => {
      this.isAuth = data;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }

}
