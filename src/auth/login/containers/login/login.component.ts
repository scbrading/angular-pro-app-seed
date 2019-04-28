import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="logInUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Log in</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `,
})
export class LoginComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async logInUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.logInUser(email, password);
      this.router.navigate(['/'])
    } catch (e) {
      this.error = e.message;
    }
  }
}
