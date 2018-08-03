import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../auth/mocks/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSubscription: Subscription;

  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this._authService.authChange.subscribe((data) => {
       this.isAuth = data;
       console.log(data);
      })
  }

  onClose() {
    this._authService.logout();
    this.closeSideNav.emit();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }

}
