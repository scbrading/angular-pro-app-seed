import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="logInUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Log in</button>
      </auth-form>
    </div>
  `,
})
export class LoginComponent {

  logInUser(event: FormGroup) {
    console.log(event.value);
  }

}
