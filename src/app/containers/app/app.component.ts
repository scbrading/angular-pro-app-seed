import { Component, OnDestroy, OnInit } from '@angular/core';

// observable functions
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// store
import { Store } from 'store';

// services
import {
  AuthService,
  User,
} from '../../../auth/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <app-header [user]="user$ | async" (logOut)="onLogOut()"></app-header>
      <app-nav *ngIf="(user$ | async)?.authenticated"></app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogOut() {
    await this.authService.logOutUser();
    this.router.navigate(['auth/login'])
  }

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
